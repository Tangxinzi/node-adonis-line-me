import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class QuestionsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let all = request.all(), _answer = [[], [], []]
      const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.relation_user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.relation_user_id = :relation_user_id order by type asc;", {
        relation_user_id: all.openid
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
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async questionLists({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const answer = await Database.from('answer').select('id').where({ relation_user_id: all.openid })
      if (answer.length) {
        let answerString = answer[0].id
        for (let index = 1; index < answer.length; index++) answerString += ', ' + answer[index].id;
        var rawQuerySql = "SELECT * FROM questions where id not in (" + answerString + ") ORDER BY RAND() LIMIT 6;"
      } else {
        var rawQuerySql = "SELECT * FROM questions ORDER BY RAND() LIMIT 6;"
      }

      const questions = (await Database.rawQuery(rawQuerySql, {
        relation_user_id: all.openid
      }))[0]

      response.json({
        status: 200,
        message: "ok",
        data: questions
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

  public async answerLists({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const _answer = [[], [], []]
      const answer = (await Database.rawQuery("select questions.id as qid, questions.type, questions.title, questions.description, answer.content, answer.id as id, answer.relation_user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.relation_user_id = :relation_user_id order by type asc;", {
        relation_user_id: all.openid
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
      console.log(error)
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
      const question = await Database.from('questions').where('id', params.id).first()
      if (all.openid) {
        let answer = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()
        question.content = answer ? answer.content : ''
        question.photos = answer ? JSON.parse(answer.photos) : []
      }
      response.json({
        status: 200,
        message: "ok",
        data: question
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

  public async answer({ params, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      if (request.method() == 'GET') {
        var question = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()
        question.userinfo = await Database.from('users').where({wechat_open_id: all.openid}).first()
        question.created_at = Moment(question.created_at).fromNow()
        question = {
          ...question,
          ...await Database.from('questions').select('title').where('id', question.relation_question_id).first()
        }
        question.photos = JSON.parse(question.photos || [])
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
            relation_user_id: all.openid || '',
            photos: '',
          })
          return response.json({ status: 200, message: "ok", data: id })
        }

        const id = await Database.table('answer').returning('id').insert({
          relation_question_id: params.id || '',
          relation_user_id: all.openid || '',
          content: all.content || '',
          photos: JSON.stringify(all.photos || []),
        })
        response.json({ status: 200, message: "ok", data: id })
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
