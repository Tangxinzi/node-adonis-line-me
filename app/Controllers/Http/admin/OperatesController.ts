import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';
import GeoIP from 'geoip-lite';

export default class OperatesController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), operates = await Database.table('users_operates')
      for (let index = 0; index < operates.length; index++) {
        operates[index].customerTotal = (await Database.from('customer').where({ status: 1, user_id: operates[index].user_id }).count('* as total'))[0].total
        operates[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: operates[index].user_id }).first()
        operates[index].created_at = Moment(operates[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        operates[index].modified_at = Moment(operates[index].modified_at).format('YYYY-MM-DD HH:mm:ss')
      }

      return view.render('admin/operates/index', {
        data: {
          title: '特邀用户 - 运营',
          active: 'operates',
          subActive: 'users',
          operates,
          all
        }
      })
    } catch (error) {

    }
  }

  public async save({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user_id = all.user_id.split(',')
      for (let index = 0; index < user_id.length; index++) {
        await Database.table('users_operates').returning('id').insert({ type: all.type, user_id: user_id[index] })
      }

      session.flash('message', { type: 'success', header: '创建成功', message: `已添加特邀用户 ${ JSON.stringify(user_id) }` })
      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }
}
