import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger';
import Moment from 'moment';
import GeoIP from 'geoip-lite';
const zpData = require('../lib/Zhipin');

export default class UsersController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const users = await Database.from('users').orderBy('id', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < users.length; index++) {
        users[index].work = JSON.parse(users[index].work)
        if (users[index].work && users[index].work['value']) {
          users[index].work['text'] = await zpData.data(users[index].work['value'][0], users[index].work['value'][1])
        }

        users[index].photos = JSON.parse(users[index].photos)
        users[index].ip = GeoIP.lookup(users[index].ip)
        users[index]['online_at'] = Moment(users[index]['online_at']).fromNow()
        users[index]['created_at'] = Moment(users[index]['created_at']).format('YYYY-MM-DD hh:mm:ss')
      }

      return view.render('admin/user/index', {
        data: {
          title: '用户',
          active: 'users',
          users,
          all
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async edit({ params, request, response, session, view }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where({ 'user_id': params.user_id, status: 1 }).first()
      user.work = JSON.parse(user.work)
      if (user.work && user.work.value) {
        user.work.text = await zpData.data(user.work.value[0], user.work.value[1])
      }

      user.photos = JSON.parse(user.photos)
      user.ip = GeoIP.lookup(user.ip) || {}
      user.online_at = Moment(user.online_at).fromNow()
      user.created_at = Moment(user.created_at).format('YYYY-MM-DD hh:mm:ss')

      return view.render('admin/user/edit', {
        data: {
          title: '用户',
          active: 'users',
          user
        }
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async update({ params, request, response, session, view }: HttpContextContract) {
    try {
      const all = request.all()
      console.log(all);
      return all
    } catch (error) {
      console.log(error);
    }
  }
}
