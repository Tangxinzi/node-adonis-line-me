import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fs from 'fs';
import Env from 'Env';
import Model from 'Model';
import Jwtoken from 'jsonwebtoken';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ApiCheck {
  public async handle({ request, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    try {
      await next()

    } catch (e) {
      console.log(e);
    } finally {

    }
  }
}
