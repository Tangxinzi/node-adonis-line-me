import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')

export default class CommentsController {
  public async create({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('comments').insert({ type: all.type, comment_content: all.comment_content, relation_type_id: all.id, user_id: session.get('user_id'), ip: request.ip() })
      if (id.length) {
        response.json({ status: 200, message: "ok" })
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

  public async my({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const comments = await Database.from('comments').select('*').where({ user_id: session.get('user_id') })
      for (let index = 0; index < comments.length; index++) {
        comments[index].created_at = Moment(comments[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }
      response.json({ status: 200, message: "ok", data: comments })
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
