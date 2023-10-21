import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class CommentsController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('comments').insert({ type: all.type, comment_content: all.comment_content, relation_type_id: all.id, relation_user_id: all.openid, ip: request.ip() })
      if (id.length) {
        response.json({ status: 200, message: "ok" })
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
}
