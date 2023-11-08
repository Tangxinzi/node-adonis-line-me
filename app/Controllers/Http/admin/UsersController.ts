import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';
import GeoIP from 'geoip-lite';
const zpData = require('../lib/Zhipin');

export default class UsersController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const users = await Database.from('users')
      for (let index = 0; index < users.length; index++) {
        users[index].work = JSON.parse(users[index].work)
        if (users[index].work && users[index].work['value']) {
          users[index].work['text'] = await zpData.data(users[index].work['value'][0], users[index].work['value'][1])
        }

        users[index].photos = JSON.parse(users[index].photos)
        users[index].ip = GeoIP.lookup(users[index].ip)
        users[index]['online_at'] = Moment(users[index]['online_at']).fromNow()
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
