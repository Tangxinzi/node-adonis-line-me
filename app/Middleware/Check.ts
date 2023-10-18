import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Check {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    try {
      await next()
    } catch (e) {
      console.log(e);
    }
  }
}
