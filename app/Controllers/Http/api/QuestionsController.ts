import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DataController {
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
      const question = await Database.from('questions').where('id', params.id).first()
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
}
