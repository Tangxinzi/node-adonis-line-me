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
        // 格式数据
        await Database.from('users').where('wechat_open_id', all.openid).update({ online_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() })
        user['photos'] = JSON.parse(user['photos'])
        user['zodiac_sign'] = this.getZodiacSign(Moment(user['birthday']).format('DD'), Moment(user['birthday']).format('MM'))
        user['age'] = Moment().diff(user['birthday'], 'years')

        user['work'] = JSON.parse(user['work'])
        if (user['work'] && user['work']['value']) {
          user['work']['text'] = await zpData.data(user['work']['value'][0], user['work']['value'][1])
        }

        // 个性化问答
        if (user.wechat_open_id) {
          let _answer = [[], [], []]
          const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.relation_user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.relation_user_id = :relation_user_id order by type asc;", {
            relation_user_id: user.wechat_open_id
          }))[0]

          for (let index = 0; index < answer.length; index++) {
            switch (answer[index].type) {
              case '0':
                _answer[0].push(answer[index])
                break;
              case '1':
                _answer[1].push(answer[index])
                break;
              case '2':
                _answer[2].push(answer[index])
                break;
            }
          }
          user.answer = _answer
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
          await Database.from('users').where('wechat_open_id', all.openid).update({ work: JSON.stringify(all.value || '') })
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
        case 'photos':
          await Database.from('users').where('wechat_open_id', all.openid).update({ photos: JSON.stringify(all.value || '') })
          break;
        default:
        case 'school':
          await Database.from('users').where('wechat_open_id', all.openid).update({ school: all.value })
          break;
        case 'company':
          await Database.from('users').where('wechat_open_id', all.openid).update({ company: all.value })
          break;
        case 'location':
          await Database.from('users').where('wechat_open_id', all.openid).update({ location: all.value })
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
  public async changeType({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
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
      const user = await Database.from('users').where('wechat_open_id', all.openid).first()

      const QrCode = require('qrcode');
      return await QrCode.toDataURL(user.user_id, { width: 100 })
    } catch (error) {
      console.log(error)
    }
  }
}
