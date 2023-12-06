import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Jwt from 'App/Models/Jwt';
import * as Vibrant from 'node-vibrant'
import axios from "axios";
import iconv from 'iconv-lite';
import Moment from'moment';
import QrCode from 'qrcode';
import fs from "fs";

const Avatar = require('../lib/Avatar');
const zpData = require('../lib/Zhipin');
const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const Weixin = require('../lib/Weixin');
const RELATION = ["朋友", "亲戚", "伙伴", "同事", "其他"]
const SALARY_RANGE = [
  { index: 0, value: '5w 以内' },
  { index: 1, value: '5 - 10w' },
  { index: 2, value: '10 - 20w' },
  { index: 3, value: '20 - 30w' },
  { index: 4, value: '30 - 50w' },
  { index: 5, value: '50 - 100w' },
  { index: 6, value: '100w 以上' }
]

export default class CustomerController {
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

  public async index({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id  as cid', 'user_id', 'introduction', 'relation', 'relation_log_id', 'relation_user_id').where({ status: 1, recommend: 1 }).orderBy('recommend_at', 'desc').limit(10)
      for (let index = 0; index < customer.length; index++) {
        // 红娘自行发布
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('*').where('id', customer[index].relation_log_id).first(),
            parent: await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first()
          }
        }

        // 关联注册用户 openid
        if (customer[index].relation_user_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('*').where('user_id', customer[index].relation_user_id).first(),
            parent: await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].relation_user_id).first()
          }
        }

        // 格式数据
        customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : []
        customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : []
        customer[index]['zodiac_sign'] = this.getZodiacSign(Moment(customer[index]['birthday']).format('DD'), Moment(customer[index]['birthday']).format('MM'))
        customer[index]['age'] = Moment().diff(customer[index]['birthday'], 'years')
        customer[index].relation = RELATION[customer[index].relation]
        customer[index].salary = customer[index].salary ? SALARY_RANGE[customer[index].salary].value : ''

        customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : []
        if (customer[index]['work']['value']) {
          customer[index]['work']['text'] = await zpData.data(customer[index]['work']['value'][0], customer[index]['work']['value'][1])
        }

        // 个性化问答
        if (customer[index].relation_wechat_open_id) {
          let _answer = [[], [], []]
          const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.user_id = :user_id order by type asc;", {
            user_id: customer[index].relation_user_id
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
          customer[index].answer = _answer
        }

        // IP 属地
        if (customer[index].ip) {
          await axios({
            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ customer[index].ip }&json=true`,
            responseType: "arraybuffer"
          }).then((response) => {
            const data = iconv.decode(response.data, 'gbk')
            customer[index].ip = data ? JSON.parse(data) : ''
          }).catch((error) => {
            // console.log(error)
          })
        }

        // 头像主色
        // if (customer[index].avatar_url) {
        //   const imagePath = Application.publicPath(customer[index].avatar_url);
        //   await Vibrant.from(imagePath).getPalette().then((palette) => {
        //     let rgb = palette.DarkVibrant._rgb
        //     let color = `rgba(${ parseInt(rgb[0]) }, ${ parseInt(rgb[1]) }, ${ parseInt(rgb[2]) }, 1)`
        //     customer[index].color = color
        //   })
        // }
      }
      return customer
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async relationCustomerinfo({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('id', Jwt.verifyPublicKey(all.relation_sign)).first()
      const id = await Database.table('customer').returning('id').insert({
        user_id: session.get('user_id'),
        relation: all.relation || '',
        relation_user_id: user.user_id || '',
        introduction: all.introduction,
        userinfo: JSON.stringify(all.userinfo)
      })

      response.json({ status: 200, sms: "ok" })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "internalServerError",
        data: error
      })
    }
  }

  public async customerInfo({ params, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      let customer = await Database.from('customer').select('id', 'user_id', 'introduction', 'relation_log_id', 'relation_user_id').whereIn('status', [1, 2]).where({ id: params.id }).first()

      // 红娘自行发布用户
      if (customer.relation_log_id) {
        customer = {
          ...customer,
          ...await Database.from('customer_log').select('*').where('id', customer.relation_log_id).first()
        }
      }

      // 关联已存在用户
      if (customer.relation_user_id) {
        customer = {
          ...customer,
          ...await Database.from('users').select('avatar_url', 'nickname', 'detail').where('user_id', customer.relation_user_id).first()
        }
      }
      response.json({
        status: 200,
        sms: "ok",
        data: customer
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "internalServerError",
        data: error
      })
    }
  }

  public async verifyPhone({ session, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const userPhone = (await Database.from('users').where({ phone: all.phone }).count('* as total'))[0].total, customerPhone = (await Database.from('customer_log').where({ phone: all.phone }).count('* as total'))[0].total
      if (userPhone || customerPhone) {
        return response.json({ status: 200, message: "error", data: '您验证的手机号当前被占用' })
      }

      let sms = await Database.from('sms').where({ code: all.code, phone: all.phone, user_id: session.get('user_id') }).orderBy('created_at', 'desc').first()
      if (sms) {
        const seconds = Moment().diff(sms.created_at, 'seconds')
        if (seconds > 300) {
          return response.json({ status: 200, message: "timeout", data: '当前验证码已失效' })
        } else {
          const customer = await Database.from('customer').where({ relation_log_id: all.id, user_id: session.get('user_id') }).first()
          if (customer.id) {
            const result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ phone: all.phone })
            return response.json({ status: 200, message: "ok", data: '已验证' })
          }
        }
      } else {
        return response.json({ status: 200, message: "error", data: '手机号或者验证码填写错误' })
      }
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        messages: "internalServerError",
        data: JSON.stringify(error)
      })
    }
  }

  // 红娘发布客户
  public async createCustomerinfo({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('customer_log').returning('id').insert({
        nickname: all.nickname,
        avatar_url: all.avatar_url || Avatar.data(all.sex),
        birthday: all.birthday || '',
        height: all.height,
        sex: all.sex,
        work: JSON.stringify(all.work || ''),
        photos: JSON.stringify(all.photos || [])
      })

      const customer = await Database.table('customer').insert({
        user_id: session.get('user_id'), // 关联 发布用户 user id
        relation_log_id: id, // 关联 customer log
        relation: all.relation,
        introduction: all.introduction || '',
        userinfo: JSON.stringify(all)
      })

      response.json({
        status: 200,
        sms: "ok",
        data: customer
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "ok",
        data: error
      })
    }
  }

  public async customerList({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id', 'user_id', 'relation', 'introduction', 'relation_log_id', 'relation_user_id', 'created_at').whereIn('status', [1, 2]).where('user_id', all.user_id || session.get('user_id')).orderBy('created_at', 'desc')
      for (let index = 0; index < customer.length; index++) {
        if (customer[index].relation_user_id) {
          customer[index] = {
            ...customer[index],
            percent: await percentUserinfo(customer[index].relation_user_id),
            ...await Database.from('users').select('avatar_url', 'nickname', 'work', 'detail', 'phone').where('user_id', customer[index].relation_user_id).first()
          }
        } else if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            percent: await percentCustomerinfo(customer[index].relation_log_id),
            ...await Database.from('customer_log').select('avatar_url', 'nickname', 'work', 'detail', 'phone').where('id', customer[index].relation_log_id).first()
          }
        }

        customer[index].relation = RELATION[customer[index].relation]
        customer[index].work = customer[index].work ? JSON.parse(customer[index].work) : []
        if (customer[index].work.value) {
          customer[index].work.text = await zpData.data(customer[index].work.value[0], customer[index].work.value[1])
        }

        customer[index].created_at = Moment(customer[index].created_at).format('YYYY-MM-DD')
      }

      response.json({
        status: 200,
        sms: "ok",
        data: {
          user: await Database.from('users').select('avatar_url', 'nickname', 'detail').where('user_id', all.user_id || session.get('user_id')).first(),
          customer
        }
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "internalServerError",
        data: error
      })
    }
  }

  public async customerShow({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id as cid', 'status', 'user_id', 'relation_user_id', 'relation', 'relation_log_id', 'introduction').where({ 'id': params.id, status: 1 }).first()

      customer.relation_text = RELATION[customer.relation]
      if (customer.relation_log_id) {
        customer.userinfo = await Database.from('customer_log').select('*').where({ 'id': customer.relation_log_id }).first()
      } else if(customer.relation_user_id) {
        customer.userinfo = await Database.from('users').select('*').where({ 'user_id': customer.relation_user_id }).first()
      }

      customer.parent = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer.user_id).first()
      customer.introduces = await Database.from('answer').where({ type: 1, status: 1, user_id: customer.relation_user_id })

      customer.userinfo.location = customer.userinfo.location ? JSON.parse(customer.userinfo.location) : ''
      customer.userinfo.age = Moment().diff(customer.userinfo.birthday, 'years')
      customer.userinfo.zodiac_sign = this.getZodiacSign(Moment(customer.userinfo.birthday).format('DD'), Moment(customer.userinfo.birthday).format('MM'))
      customer.userinfo.photos = customer.userinfo.photos ? JSON.parse(customer.userinfo.photos) : []

      customer.userinfo.work = customer.userinfo.work ? JSON.parse(customer.userinfo.work) : []
      if (customer.userinfo.work.value) {
        customer.userinfo.work.text = await zpData.data(customer.userinfo.work.value[0], customer.userinfo.work.value[1])
      }

      customer.like = await Database.from('likes').select('id').where({ status: 1, type: 'customer', relation_type_id: customer.cid, user_id: session.get('user_id') }).first() || {}

      if (all.type == 'share') {
        // 创建小程序码
        customer.wxacode = `/uploads/wxacode/customer-${ customer.cid }.png`
        fs.access(Application.publicPath(customer.wxacode), fs.constants.F_OK, async (err) => {
          if (err) {
            await Weixin.getWxacode({
              filename: 'customer-' + customer.cid,
              path: 'pages/user-info-detail/user-info-detail?id=' + customer.cid,
            })
          }
        })

        // URLLink
        customer.urllink = await Weixin.generateUrllink({
          path: 'pages/user-info-detail/user-info-detail?id=' + customer.cid,
        })

        // URLLink
        customer.shortlink = await Weixin.genwxaShortlink({
          path: 'pages/user-info-detail/user-info-detail?id=' + customer.cid,
        })

        // 二维码
        // customer.qrcode = await QrCode.toDataURL('/pages/user-info-detail/user-info-detail?id=' + customer.cid, { width: 180 })
      }

      response.json({
        status: 200,
        sms: "ok",
        data: customer
      })
    } catch (error) {
      console.log(error);

      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "internalServerError",
        data: error
      })
    }
  }

  public async updateCustomerField({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      let customer = await Database.from('customer').where({ id: params.id, user_id: session.get('user_id') }).first()
      switch (`${ all.type }.${ all.field }`) {
        case 'customer.relation':
          var result = await Database.from('customer').where({ id: params.id, user_id: session.get('user_id') }).update({ relation: all.value })
          break;
        case 'customer.introduction':
          var result = await Database.from('customer').where({ id: params.id, user_id: session.get('user_id') }).update({ introduction: all.value })
          break;
        case 'userinfo.nickname':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ nickname: all.value })
          break;
        case 'userinfo.avatar_url':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ avatar_url: all.value })
          break;
        case 'userinfo.contact_wechat':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ contact_wechat: all.value })
          break;
        case 'userinfo.photos':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ photos: JSON.stringify(all.value) })
          break;
        case 'userinfo.work':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ work: JSON.stringify(all.value) })
          break;
        case 'userinfo.height':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ height: all.value })
          break;
        case 'userinfo.birthday':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ birthday: all.value })
          break;
        case 'userinfo.location':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ location: JSON.stringify(all.value) })
          break;
        case 'userinfo.school':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ school: all.value })
          break;
        case 'userinfo.company':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ company: all.value })
          break;
        case 'userinfo.salary':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ salary: all.value })
          break;
      }

      response.json({
        status: 200,
        sms: "ok",
        data: result
      })
    } catch (error) {
      console.log(error);

      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "ok",
        data: error
      })
    }
  }

  public async deleteCustomer({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.from('customer').where({ 'id': params.id, user_id: session.get('user_id') }).update({
        status: 0,
        deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss')
      }, ['id'])

      response.json({
        status: 200,
        sms: "ok"
      })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        sms: "internalServerError",
        data: error
      })
    }
  }
}
