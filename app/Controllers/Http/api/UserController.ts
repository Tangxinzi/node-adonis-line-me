import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// const { jscode2session } = require('../lib/Weixin');

export default class UserController {
  jscode2session(code) {
    return new Promise((resolve, reject) => {
      return axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${ Env.get('AppID') }&secret=${ Env.get('AppSecret') }&js_code=${ code }&grant_type=authorization_code`)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  public async wxaLogin({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await this.jscode2session(all.code)
      const user = await Database.from('users').where('wechat_open_id', result.openid).first()
      if (user) {
        result.user = user
      } else {
        const id = await Database.table('users').returning('id').insert({
          user_id: uuidv4(),
          wechat_open_id: result.openid,
        })

        result.id = id
      }

      return result
    } catch (error) {
      console.log(error)
    }
  }

  public async getUserinfo({ request }: HttpContextContract) {
    try {
      const all = request.all()
      return await Database.from('users').where('wechat_open_id', all.openid).first()
    } catch (error) {
      console.log(error)
      return
    }
  }

  public async updateUserinfo({ request }: HttpContextContract) {
    try {
      const all = request.all()
      return Database.from('users').where('wechat_open_id', all.openid).update({
        nickname: all.nickname,
        avatar_url: all.avatar_url,
        work: all.work,
        height: all.height,
        sex: all.sex,
        photos: JSON.stringify(all.photos || ''),
        // modified_at: ''
      }, ['id'])
    } catch (error) {
      console.log(error)
    }
  }
}
