import Database from '@ioc:Adonis/Lucid/Database'

export default class PublishesController {
  public async create({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const data = await Database.rawQuery('select * from customer')
      const user = await Database.table('users').returning('id').insert({
        nickname: all.nickname || '',
        birthday: all.birthday || '',
        sex: all.sex || '',
        contact: all.contact || '',
        location: all.location || '',
        introduction: all.introduction || '',
        phtots: all.phtots || '',
        video: all.video || '',
      })

      const customer = await Database.table('customer').returning('id').insert({
        relation: all.relation || '',
        relation_id: all.relation_id || '',
        detail: all.detail || '',

      })

      return user
    } catch (error) {
      console.log(error)
    }
  }
}
