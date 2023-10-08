import Database from '@ioc:Adonis/Lucid/Database'

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

  public async lists({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const questions = await Database.from('questions').where('type', all.type)

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

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const question = await Database.from('questions').where('id', params.id).first()
      if (all.openid) {
        let answer = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()
        question.content = answer ? answer.content : ''
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
        const question = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()
        response.json({ status: 200, message: "ok", data: question })
      }

      if (request.method() == 'POST') {
        const id = await Database.table('answer').returning('id').insert({
          relation_question_id: params.id || '',
          relation_user_id: all.openid || '',
          content: all.content || ''
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
