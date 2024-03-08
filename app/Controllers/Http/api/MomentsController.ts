import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';
import zpData from '../lib/Zhipin';

export default class MomentsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.photos', 'moments.created_at', 'users.wechat_open_id', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.ip').join('users', 'moments.user_id', '=', 'users.wechat_open_id').orderBy('moments.created_at', 'desc')
      for (let index = 0; index < moments.length; index++) {
        moments[index].data_type = 'image'
        moments[index].photos = moments[index].photos ? JSON.parse(moments[index].photos) : []
        moments[index].created_at = Moment(moments[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      response.json({
        status: 200,
        message: "ok",
        data: moments
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

  async getUserinfo(user_id) {
    try {
      const user = await Database.from('users').select('nickname', 'avatar_url', 'location', 'birthday', 'work', 'sex').where({ user_id }).first() || {}
      user.photos = user.photos ? JSON.parse(user.photos) : {}
      user.location = user.location ? JSON.parse(user.location) : {}
      user.age = Moment().diff(user.birthday, 'years')
      user.work = JSON.parse(user.work)
      if (user.work && user.work.value) {
        user.work.text = await zpData.data(user.work.value[0], user.work.value[1])
      }

      return user
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async lists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').where('user_id', all.user_id || session.get('user_id')).orderBy('created_at', 'desc')
      const userinfo = await this.getUserinfo(all.user_id || session.get('user_id'))

      for (let index = 0; index < moments.length; index++) {
        moments[index].userinfo = userinfo
        moments[index].data_type = 'image'
        moments[index].photos = moments[index].photos ? JSON.parse(moments[index].photos) : []
        moments[index].created_at = Moment(moments[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        moments[index].modified_at = Moment(moments[index].modified_at).format('YYYY-MM-DD HH:mm:ss')
      }

      response.json({
        status: 200,
        message: "ok",
        data: moments
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

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const moment = await Database.from('moments').where('id', params.id).first()

      // 格式化数据
      moment.data_type = 'image'
      moment.photos = moment.photos ? JSON.parse(moment.photos) : []
      moment.created_at = Moment(moment.created_at).format('YYYY-MM-DD HH:mm:ss')
      moment.modified_at = Moment(moment.modified_at).format('YYYY-MM-DD HH:mm:ss')

      response.json({
        status: 200,
        message: "ok",
        data: moment
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

  public async create({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (!all.content && all.photos.length == 0) {
        return response.json({ status: 400, message: "error", data: '' })
      }

      let id = await Database.table('moments').returning('id').insert({
        user_id: session.get('user_id'),
        content: all.content,
        photos: JSON.stringify(all.photos || []),
        business_id: all.business_id || '',
        ip: request.ip()
      })

      if (id[0]) {
        return response.json({ status: 200, message: "ok" })
      } else {
        return response.json({
          status: 500,
          message: "internalServerError",
          data: 'err'
        })
      }
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
