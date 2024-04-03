import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WebCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await next()
    } catch (e) {
      console.log(e);
      response.abort('Not authenticated', 401)
    }
  }
}
