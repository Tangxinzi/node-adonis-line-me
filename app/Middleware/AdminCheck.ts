import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    try {
      const sign = session.get('adonis-cookie-sign')
      
      if (sign) {
        const { total } = (await Database.from('verification').where({ is_verified: 0 }).count('* as total'))[0]

        // 设置未验证数据总数的 Cookie
        response.plainCookie('dataset', { verificationTotal: total }, { httpOnly: false })

        await next()
      } else {
        // 没有身份验证签名，且不是登录页面，则重定向到登录页
        if (request.url() !== '/admin/login') {
          return response.redirect().status(301).toRoute('admin/UsersController.login')
        }
        
        await next()
      }
    } catch (error) {
      console.error(error)
      response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
