import Database from '@ioc:Adonis/Lucid/Database';
import Moment from'moment';

export default class UsersController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const users = await Database.from('users')
      for (let index = 0; index < users.length; index++) {
        users[index]['created_at'] = Moment(users[index]['created_at']).format('YYYY-MM-DD hh:mm:ss')
      }

      return view.render('admin.user.index', {
        data: {
          title: '用户',
          active: 'users',
          users
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
