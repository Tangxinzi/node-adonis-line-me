'use strict'

import Fs from 'fs';
import Jwtoken from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env';
import Application from '@ioc:Adonis/Core/Application'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Jwt extends BaseModel {
  // HS256
  static sign (data) {
    return Jwtoken.sign(JSON.parse(data), Env.get('APP_KEY'))
  }

  static verify (token) {
    return Jwtoken.verify(token, Env.get('APP_KEY'))
  }

  static decode (token) {
    return Jwtoken.decode(token, Env.get('APP_KEY'))
  }

  // RS256
  static signPrivateKey (data) {
    try {
      return Jwtoken.sign(JSON.parse(data), Fs.readFileSync(Application.configPath('pem/private.key')), { algorithm: 'RS256' })
    } catch (e) {
      console.log(e);
    }
  }

  static verifyPublicKey (token) {
    try {
      return Jwtoken.verify(token, Fs.readFileSync(Application.configPath('pem/public.key')))
    } catch (e) {
      console.log(e);
    }
  }

  static decodeKey (token) {
    return Jwtoken.decode(token)
  }
}

module.exports = Jwt
