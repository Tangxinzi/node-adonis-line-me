import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import iconv from 'iconv-lite';
import Jwt from 'App/Models/Jwt';
import RandomString from "randomstring";
import { v4 as uuidv4 } from 'uuid';
import Moment from'moment';
import * as Vibrant from 'node-vibrant'

const zpData = require('../lib/Zhipin');
const Avatar = require('../lib/Avatar');
const { jscode2session } = require('../lib/Weixin');

export default class UserController {
  getZodiacSign(day, month) {
    const zodiacSigns = [
      '摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
      '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'
    ];

    const signDates = [
      { month: 1, day: 20 }, { month: 2, day: 19 }, { month: 3, day: 20 },
      { month: 4, day: 20 }, { month: 5, day: 21 }, { month: 6, day: 21 },
      { month: 7, day: 23 }, { month: 8, day: 23 }, { month: 9, day: 23 },
      { month: 10, day: 23 }, { month: 11, day: 22 }, { month: 12, day: 22 }
    ];

    let i = 0;
    while (i < signDates.length) {
      if (month < signDates[i].month || (month === signDates[i].month && day <= signDates[i].day)) {
        return zodiacSigns[i];
      }
      i++;
    }

    return zodiacSigns[0];
  }

  public async wxaLogin({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await jscode2session(all.code)
      result.user = await Database.from('users').where('wechat_open_id', result.openid).first() || {}
      if (!result.user.id) {
        const id = await Database.table('users').returning('id').insert({
          user_id: 'hl_a' + RandomString.generate({ length: 8, charset: ['numeric'] }),
          wechat_open_id: result.openid,
        })
        result.user.id = id[0]
      }
      result.user.sign = Jwt.signPrivateKey(result.user.id)
      return result
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async getUserinfo({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first()

      if (user) {
        // 格式数据
        await Database.from('users').where('user_id', session.get('user_id')).update({ online_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() })
        user.photos = JSON.parse(user.photos)
        user['videos'] = JSON.parse(user['videos'])
        user['zodiac_sign'] = this.getZodiacSign(Moment(user['birthday']).format('DD'), Moment(user['birthday']).format('MM'))
        user['age'] = Moment().diff(user['birthday'], 'years')

        user['work'] = JSON.parse(user['work'])
        if (user['work'] && user['work']['value']) {
          user['work']['text'] = await zpData.data(user['work']['value'][0], user['work']['value'][1])
        }

        user['number'] = {
          message: 0,
          introduction: 0,
          visitor: 0,
          moment: (await Database.from('moments').where('user_id', session.get('user_id')).count('* as total'))[0].total,
          answer: (await Database.from('answer').where('user_id', session.get('user_id')).count('* as total'))[0].total,
          customer: (await Database.from('customer').where({ status: 1, user_id: session.get('user_id') }).count('* as total'))[0].total,
        }

        // 头像主色
        // if (user.avatar_url) {
        //   const imagePath = Application.publicPath(user.avatar_url);
        //   Vibrant.from(imagePath).getPalette().then((palette) => {
        //     let rgb = palette.Vibrant._rgb
        //     user.color = `rgba(${ rgb[0] }, ${ rgb[1] }, ${ rgb[2] }, .2)`
        //   })
        // }

        // IP 属地
        if (user.ip) {
          await axios({
            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ request.ip() }&json=true`,
            responseType: "arraybuffer"
          }).then(function (response) {
            const data = iconv.decode(response.data, 'gbk')
            user.ip = data ? JSON.parse(data) : ''
          }).catch(function (error) {
            // console.log(error)
          })
        }
      }

      return user
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      return error
    }
  }

  public async updateUserinfo({ request, session }: HttpContextContract) {
    try {
      const all = request.all()

      return Database.from('users').where('user_id', session.get('user_id')).update({
        type: all.type,
        nickname: all.nickname,
        avatar_url: all.avatar_url || Avatar.data(all.sex),
        work: JSON.stringify(all.work),
        height: all.height,
        sex: all.sex,
        birthday: all.birthday,
        photos: JSON.stringify(all.photos || []),
        ip: request.ip(),
        modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
      }, ['id'])
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async updateUserField({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()

      switch (all.type) {
        case 'nickname':
          await Database.from('users').where('user_id', session.get('user_id')).update({ nickname: all.value })
          break;
        case 'birthday':
          await Database.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value })
          break;
        case 'height':
          await Database.from('users').where('user_id', session.get('user_id')).update({ height: all.value })
          break;
        case 'work':
          await Database.from('users').where('user_id', session.get('user_id')).update({ work: JSON.stringify(all.value || '') })
          break;
        case 'birthday':
          await Database.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value })
          break;
        case 'detail':
          await Database.from('users').where('user_id', session.get('user_id')).update({ detail: all.value })
          break;
        case 'phone':
          await Database.from('users').where('user_id', session.get('user_id')).update({ phone: all.value })
          break;
        case 'photos':
          await Database.from('users').where('user_id', session.get('user_id')).update({ photos: JSON.stringify(all.value || []) })
          break;
        case 'videos':
          await Database.from('users').where('user_id', session.get('user_id')).update({ videos: JSON.stringify(all.value || []) })
          break;
        default:
        case 'school':
          await Database.from('users').where('user_id', session.get('user_id')).update({ school: all.value })
          break;
        case 'company':
          await Database.from('users').where('user_id', session.get('user_id')).update({ company: all.value })
          break;
        case 'location':
          await Database.from('users').where('user_id', session.get('user_id')).update({ location: all.value })
          break;
      }

      response.json({
        status: 200,
        message: "ok"
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  // 切换用户身份
  public async changeType({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first()
      if (user) {
        await Database.from('users').where('user_id', session.get('user_id')).update({ type: user.type == 1 ? 2 : 1 })
        response.json({
          status: 200,
          message: "ok"
        })
      }
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async qrcode({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first()

      const QrCode = require('qrcode');
      return await QrCode.toDataURL(user.user_id, { width: 100 })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }
}
