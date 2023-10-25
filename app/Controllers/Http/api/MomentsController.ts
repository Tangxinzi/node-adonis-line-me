import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment';

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

  public async lists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').where('user_id', session.get('user_id')).orderBy('created_at', 'desc')
      for (let index = 0; index < moments.length; index++) {
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
      let id = await Database.table('moments').returning('id').insert({
        user_id: session.get('user_id'),
        content: all.content,
        photos: JSON.stringify(all.photos || []),
      })

      if (id[0]) {
        response.json({ status: 200, message: "ok" })
      } else {
        response.json({
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
