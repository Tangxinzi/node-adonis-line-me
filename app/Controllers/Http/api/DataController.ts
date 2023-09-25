import Database from '@ioc:Adonis/Lucid/Database'

export default class DataController {
  public async index({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const data = await Database.rawQuery('select * from customer, users where `customer`.`user_wechat_open_id` = `users`.`wechat_open_id`')
      return data[0]
    } catch (error) {
      console.log(error)
    }
  }
}
