import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';

export default class MomentsController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      let id = await Database.table('moments').returning('id').insert({
        relation_user_id: all.openid || '',
        content: all.content || '',
        photos: JSON.stringify(all.photos) || '',
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
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async lists({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').where('relation_user_id', all.openid).orderBy('created_at', 'desc')
      for (let index = 0; index < moments.length; index++) {
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
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
