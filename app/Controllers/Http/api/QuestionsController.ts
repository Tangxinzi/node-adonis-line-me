import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')

export default class QuestionsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let all = request.all(), _answer = [[], [], []]
      const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.user_id = :user_id order by type asc;", {
        user_id: all.openid
      }))[0]

      for (let index = 0; index < answer.length; index++) {
        switch (answer[index].type) {
          case '0':
            _answer[0].push(answer[index])
            break;
          case '1':
            _answer[1].push(answer[index])
            break;
          case '2':
            _answer[2].push(answer[index])
            break;
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: _answer
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
        for (let index = 1; index < answer.length; index++) answerString += ', ' + answer[index].id;
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
      const _answer = [[], [], []]
      const answer = (await Database.rawQuery("select questions.id as qid, questions.type, questions.title, questions.description, answer.content, answer.id as id, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.type = 0 and answer.user_id = :user_id order by type asc;", {
        user_id: session.get('user_id')
      }))[0]

      for (let index = 0; index < answer.length; index++) {
        switch (answer[index].type) {
          case '0':
            _answer[0].push(answer[index])
            break;
          case '1':
            _answer[1].push(answer[index])
            break;
          case '2':
            _answer[2].push(answer[index])
            break;
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: _answer
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

  public async introduceLists({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const answer = (await Database.rawQuery("select questions.id as qid, questions.type, questions.title, questions.description, answer.content, answer.id as id, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.type = 1 and answer.user_id = :user_id order by type asc;", {
        user_id: session.get('user_id')
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

  public async show({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const question = await Database.from('questions').where('id', params.id).first()
      let answer = await Database.from('answer').where({relation_question_id: params.id, user_id: session.get('user_id')}).first()
      console.log(answer);


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
        response.json({ status: 200, message: "ok", data: question })
      }

      if (request.method() == 'POST') {
        // 邀请好友为自己介绍的接口
        if (params.id == 'type') {
          const id = await Database.table('answer').returning('id').insert({
            type: 1,
            introduce_name: all.name || '',
            introduce_openid: all.introduce_openid || '',
            content: all.content || '',
            relation_question_id: '',
            user_id: session.get('user_id') || '',
            photos: JSON.stringify(all.photos || []),
          })
          return response.json({ status: 200, message: "ok", data: id })
        }

        const id = await Database.table('answer').returning('id').insert({
          user_id: session.get('user_id'),
          relation_question_id: params.id,
          content: all.content || '',
          photos: JSON.stringify(all.photos || []),
        })
        response.json({ status: 200, message: "ok", data: id })
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
