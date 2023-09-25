import Database from '@ioc:Adonis/Lucid/Database';
import Moment from'moment';

export default class CustomersController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customers = await Database.rawQuery('select * from customer, users where `customer`.`user_wechat_open_id` = `users`.`wechat_open_id`')
      for (let index = 0; index < customers[0].length; index++) {
        customers[0][index]['created_at'] = Moment(customers[0][index]['created_at']).format('YYYY-MM-DD hh:mm:ss')
      }

      return view.render('admin.customer.index', {
        data: {
          title: '推介',
          active: 'customers',
          customers: customers[0]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
