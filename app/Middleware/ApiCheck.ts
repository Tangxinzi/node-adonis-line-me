import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fs from 'fs';
import Jwt from 'App/Models/Jwt';
import Env from '@ioc:Adonis/Core/Env';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ApiCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      const userSign = request.header('User-Sign')
      if (userSign) {
        const user = await Database.from('users').where('id', Jwt.verifyPublicKey(userSign || '')).first()
        session.put('user_id', user.user_id)
      }
      await next()
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
