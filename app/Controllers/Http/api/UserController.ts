import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import iconv from 'iconv-lite';
import RandomString from "randomstring";
import { v4 as uuidv4 } from 'uuid';
import Moment from'moment';
import * as Vibrant from 'node-vibrant'

const zpData = require('../lib/Zhipin');
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
        await Database.table('users').returning('id').insert({
          // user_id: uuidv4(),
          user_id: RandomString.generate({ length: 8, charset: ['numeric'] }),
          wechat_open_id: result.openid,
        })
        result.user = {}
      }

      return result
    } catch (error) {
      console.log(error)
    }
  }

  public async getUserinfo({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('wechat_open_id', all.openid).first()

      if (user) {
        await Database.from('users').where('wechat_open_id', all.openid).update({ online_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() })
        user['photos'] = JSON.parse(user['photos'])
        user['work'] = JSON.parse(user['work'])
        if (user['work'] && user['work']['value']) {
          user['work']['text'] = await zpData.data(user['work']['value'][0], user['work']['value'][1])
        }

        if (user.avatar_url) {
          const imagePath = Application.publicPath(user.avatar_url);
          Vibrant.from(imagePath).getPalette().then((palette) => {
            let rgb = palette.Vibrant._rgb
            user.color = `rgba(${ rgb[0] }, ${ rgb[1] }, ${ rgb[2] }, .2)`
          })
        }
      }

      await axios({
        url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ request.ip() }&json=true`,
        responseType: "arraybuffer"
      }).then(function (response) {
        const data = iconv.decode(response.data, 'gbk')
        user.ip = data ? JSON.parse(data) : ''
      }).catch(function (error) {
        console.log(error)
      })

      return user
    } catch (error) {
      console.log(error)
      return error
    }
  }

  public async updateUserinfo({ request }: HttpContextContract) {
    try {
      const all = request.all()
      return Database.from('users').where('wechat_open_id', all.openid).update({
        nickname: all.nickname,
        avatar_url: all.avatar_url,
        work: JSON.stringify(all.work),
        height: all.height,
        sex: all.sex,
        photos: JSON.stringify(all.photos || ''),
        ip: request.ip(),
        // modified_at: ''
      }, ['id'])
    } catch (error) {
      console.log(error)
    }
  }

  public async updateUserField({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      switch (all.type) {
        case 'nickname':
          await Database.from('users').where('wechat_open_id', all.openid).update({ nickname: all.value })
          break;
        case 'birthday':
          await Database.from('users').where('wechat_open_id', all.openid).update({ birthday: all.value })
          break;
        case 'height':
          await Database.from('users').where('wechat_open_id', all.openid).update({ height: all.value })
          break;
        case 'work':
          await Database.from('users').where('wechat_open_id', all.openid).update({ work: JSON.stringify(all.value) })
          break;
        case 'birthday':
          await Database.from('users').where('wechat_open_id', all.openid).update({ birthday: all.value })
          break;
        case 'detail':
          await Database.from('users').where('wechat_open_id', all.openid).update({ detail: all.value })
          break;
        case 'phone':
          await Database.from('users').where('wechat_open_id', all.openid).update({ phone: all.value })
          break;

        default:
          break;
      }

      response.json({
        status: 200,
        message: "ok"
      })
    } catch (error) {
      console.log(error)
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  // 切换用户身份
  public async switch({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const QrCode = require('qrcode');
      const user = await Database.from('users').where('wechat_open_id', all.openid).first()
      if (user) {
        await Database.from('users').where('wechat_open_id', all.openid).update({ type: user.type == 1 ? 2 : 1 })
        response.json({
          status: 200,
          message: "ok"
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async qrcode({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const QrCode = require('qrcode');
      const user = await Database.from('users').where('wechat_open_id', all.openid).first()

      return await QrCode.toDataURL(user.user_id, { width: 100 })
    } catch (error) {
      console.log(error)
    }
  }
}
