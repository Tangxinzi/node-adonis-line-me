import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fs from 'fs';
import Jwt from 'App/Models/Jwt';
import Env from '@ioc:Adonis/Core/Env';
import Database from '@ioc:Adonis/Lucid/Database';

export default class AdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      const sign = session.get('adonis-cookie-sign')
      await next()
      //
      // if (sign) {
      //   await next()
      // } else {
      //   // return response.redirect().status(301).toRoute('admin/UsersController.login')
      //   return response.redirect('back')
      // }
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
