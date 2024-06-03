import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    try {
      const sign = session.get('adonis-cookie-sign')
      if (sign) {
        // 设置未验证数据总数的 Cookie
        const { total } = (await Database.from('verification').where({ is_verified: 0 }).count('* as total'))[0]
        response.plainCookie('dataset', { verificationTotal: total }, { httpOnly: false })
      } else {
        // return response.redirect().status(301).toRoute('admin/UsersController.login')
      }

      await next()
    } catch (error) {
      console.error(error)
      response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
