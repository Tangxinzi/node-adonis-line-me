import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')

export default class QuestionsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let all = request.all()
      const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.user_id = :user_id order by type asc;", {
        user_id: all.openid
      }))[0]

      response.json({
        status: 200,
        message: "ok",
        data: answer
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

  public async questionLists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const answer = await Database.from('answer').select('relation_question_id').where({ user_id: session.get('user_id') })
      if (answer.length) {
        let answerString = answer[0].relation_question_id
        for (let index = 1; index < answer.length; index++) answerString += ', ' + (answer[index].id || 0);
        var rawQuerySql = "SELECT * FROM questions where id not in (" + answerString + ") ORDER BY RAND() LIMIT 6;"
      } else {
        var rawQuerySql = "SELECT * FROM questions ORDER BY RAND() LIMIT 6;"
      }
      const questions = (await Database.rawQuery(rawQuerySql, {
        user_id: session.get('user_id')
      }))[0]

      response.json({
        status: 200,
        message: "ok",
        data: questions
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

  public async answerLists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const answer = (await Database.rawQuery("select questions.id as qid, questions.type, questions.title, questions.description, answer.content, answer.id as id, answer.user_id, answer.photos from answer left outer join questions on answer.relation_question_id = questions.id where answer.type = 0 and answer.user_id = :user_id order by type asc;", {
        user_id: all.user_id || session.get('user_id')
      }))[0]

      for (let index = 0; index < answer.length; index++) {
        answer[index].photos = answer[index].photos ? JSON.parse(answer[index].photos) : []
      }

      return response.json({ status: 200, message: "ok", data: answer })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async introduceLists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const introduces = await Database.from('answer').where({ type: 1, status: 1, user_id: session.get('user_id') }).orderBy('created_at', 'desc')
      for (let index = 0; index < introduces.length; index++) {
        introduces[index].created_at = Moment(introduces[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      response.json({
        status: 200,
        message: "ok",
        data: introduces
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

  public async show({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const question = await Database.from('questions').where('id', params.id).first()
      let answer = await Database.from('answer').where({relation_question_id: params.id, user_id: session.get('user_id')}).first()

      question.content = answer ? answer.content : ''
      question.photos = answer ? JSON.parse(answer.photos) : []
      response.json({
        status: 200,
        message: "ok",
        data: question
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

  public async answer({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (request.method() == 'GET') {
        var question = await Database.from('answer').where({id: params.id, user_id: session.get('user_id')}).first()
        question.userinfo = await Database.from('users').where({ user_id: session.get('user_id') }).first()
        question.created_at = Moment(question.created_at).fromNow()
        question = {
          ...question,
          ...await Database.from('questions').select('title').where('id', question.relation_question_id).first()
        }

        question.photos = JSON.parse(question.photos || '[]')
        return response.json({ status: 200, message: "ok", data: question })
      }

      if (request.method() == 'POST') {
        switch (all.type) {
          case '0':
            // 个性化问答接口
            var data = await Database.from('answer').where({ relation_question_id: params.id, type: 0, user_id: session.get('user_id') }).first() || {}
            if (!data.id) {
              const id = await Database.table('answer').returning('id').insert({
                user_id: session.get('user_id'),
                relation_question_id: params.id,
                content: all.content || '',
                photos: JSON.stringify(all.photos || []),
              })

              return response.json({ status: 200, message: "ok", data: id })
            } else {
              await Database.from('answer').where({ relation_question_id: params.id, type: all.type, user_id: session.get('user_id') }).update({ content: all.content || '', photos: JSON.stringify(all.photos || []), modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
              return response.json({ status: 200, message: "ok" })
            }
            break;
          case '1':
            // 邀请好友为自己介绍的接口
            var data = await Database.from('answer').where({ id: params.id, type: 1, user_id: session.get('user_id') }).first() || {}
            if (all.action == 'recommend') {
              var result = await Database.from('answer').where({ id: params.id, type: 1, user_id: session.get('user_id') }).update({ recommend: data.recommend ? 0 : 1, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
              return response.json({ status: 200, message: "ok", data: result })
            }

            if (!data.id) {
              const id = await Database.table('answer').returning('id').insert({
                type: 1,
                introduce_name: all.name || '',
                user_id: session.get('user_id') || all.openid || '', // 发布评价用户
                introduce_openid:  all.introduce_openid || '', // 被介绍的用户
                content: all.content || '',
                relation_question_id: '',
                photos: JSON.stringify(all.photos || []),
                ip: request.ip()
              })
              return response.json({ status: 200, message: "ok", data: id })
            }
            break;
        }
      }
    } catch (error) {
      console.log(error);

      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
