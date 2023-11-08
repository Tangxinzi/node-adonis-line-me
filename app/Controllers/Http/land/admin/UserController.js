import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
const { jscode2session, getuserphonenumber } = require('./lib/Weixin');

export default class UserController {
  public async getPhoneNumber({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await jscode2session(all.code)
      console.log(result);

    } catch (error) {
      console.log(error)
    }
  }
}
