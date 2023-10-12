import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class EventController {
  public async descovery({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').select('moments.id', 'moments.relation_user_id', 'moments.content', 'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'moments.relation_user_id', '=', 'users.wechat_open_id').limit(10).orderBy('moments.created_at', 'desc')
      const answer = await Database.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.relation_user_id', 'answer.content', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.relation_user_id', '=', 'users.wechat_open_id').limit(10).orderBy('answer.created_at', 'desc')

      let descovery = []
      for (let index = 0; index < 10; index++) {

        // moment
        if (moments[index]) {
          descovery.push({
            id: moments[index].id,
            relation_user_id: moments[index].relation_user_id,
            nickname: moments[index].nickname,
            avatar_url: moments[index].avatar_url,
            sex: moments[index].sex,
            content: moments[index].content,
            photos: moments[index].photos ? JSON.parse(moments[index].photos) : [],
            age: Moment().diff(moments[index].birthday, 'years'),
            data_type: 'moment',
            ip: moments[index].ip,
            created_at: Moment(moments[index].created_at).fromNow()
          })
        }

        // answer
        if (answer[index]) {
          descovery.push({
            id: answer[index].id,
            relation_user_id: answer[index].relation_user_id,
            nickname: answer[index].nickname,
            avatar_url: answer[index].avatar_url,
            sex: answer[index].sex,
            content: answer[index].content,
            photos: answer[index].photos ? JSON.parse(moments[index].photos) : [],
            age: Moment().diff(answer[index].birthday, 'years'),
            data_type: 'answer',
            ip: answer[index].ip,
            created_at: Moment(answer[index].created_at).fromNow(),
            ...await Database.from('questions').select('title').where('id', answer[index].relation_question_id).first()
          })
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: descovery
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
