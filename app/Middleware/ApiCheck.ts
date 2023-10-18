import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fs from 'fs';
import Jwt from 'App/Models/Jwt';
import Env from '@ioc:Adonis/Core/Env';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ApiCheck {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await next()
      // const userSign = request.header('User-Sign')
      // if (userSign) {
      //   const user = await Database.from('users').where('id', Jwt.verifyPublicKey(userSign || '')).first()
      //   user ? await next() : response.abort('Not authenticated', 401)
      // } else {
      //   response.abort('Not authenticated', 401)
      // }
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
