import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
// import Jwt from 'App/Models/Jwt';

export default class AdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      const sign = session.get('adonis-cookie-sign')
      if (sign) {
        // const verified = Jwt.verifyPublicKey(sign || '')
        const verificationTotal = (await Database.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total        
        response.plainCookie('dataset', {
          verificationTotal
        }, {
          httpOnly: false,
        })
        await next()
      } else if (!sign && request.url() != '/admin/login') {
        await next()
        return response.redirect().status(301).toRoute('admin/UsersController.login')
      } else {
        await next()
      }
      // await next()
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
