import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jwt from 'App/Models/Jwt';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ApiAdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      const userSign = request.header('User-Sign')
      if (userSign) {
        const user = await Database.from('users').where('id', Jwt.verifyPublicKey(userSign || '')).first() || {}
        // 审核
        const examine = await Database.from('users_operates').where({ user_id: user.user_id, status: 1 }).where('type', 'like', '%examine%').first() ? true : false
        if (examine) {
          session.put('user_id', user.user_id)
          await next()          
        }
      }
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
