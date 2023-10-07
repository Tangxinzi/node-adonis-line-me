import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class QuestionsController {
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
        var answer = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()
      }
      response.json({
        status: 200,
        message: "ok",
        data: {
          ...question,
          content: answer.content
        }
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
