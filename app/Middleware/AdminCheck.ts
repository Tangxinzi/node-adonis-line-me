import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jwt from 'App/Models/Jwt';

export default class AdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      const sign = session.get('adonis-cookie-sign')
      const cookie = request.cookie('adonis-cookie-sign', sign)
      if (cookie) {
        const verify = Jwt.verifyPublicKey(sign || '')
        await next()
      } else if (!cookie && request.url() != '/admin/login') {
        await next()
        return response.redirect().status(301).toRoute('admin/UsersController.login')
      } else {
        await next()
      }
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
