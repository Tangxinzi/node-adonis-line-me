import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import * as Vibrant from 'node-vibrant'
import axios from "axios";
import iconv from 'iconv-lite';
import Moment from'moment';
const zpData = require('../lib/Zhipin');

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

  public async index({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id', 'user_wechat_open_id', 'introduction', 'relation_log_id', 'relation_wechat_open_id').orderBy('created_at', 'desc').limit(20)
      for (let index = 0; index < customer.length; index++) {
        // 红娘自行发布
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('*').where('id', customer[index].relation_log_id).first()
          }
        }

        // 关联注册用户 openid
        if (customer[index].relation_wechat_open_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('*').where('wechat_open_id', customer[index].relation_wechat_open_id).first()
          }
        }

        // 格式数据
        customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : []
        customer[index]['zodiac_sign'] = this.getZodiacSign(Moment(customer[index]['birthday']).format('DD'), Moment(customer[index]['birthday']).format('MM'))
        customer[index]['age'] = Moment().diff(customer[index]['birthday'], 'years')
        customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : []
        if (customer[index]['work']['value']) {
          customer[index]['work']['text'] = await zpData.data(customer[index]['work']['value'][0], customer[index]['work']['value'][1])
        }

        // 个性化问答
        if (customer[index].relation_wechat_open_id) {
          let _answer = [[], [], []]
          const answer = (await Database.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.relation_user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.relation_user_id = :relation_user_id order by type asc;", {
            relation_user_id: customer[index].relation_wechat_open_id
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
      console.log(error)
    }
  }

  public async relationCustomerinfo({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('customer').returning('id').insert({
        user_wechat_open_id: all.openid,
        relation: all.relation || '',
        relation_wechat_open_id: all.relation_id || '',
        introduction: all.introduction,
        userinfo: JSON.stringify(all.userinfo)
        // modified_at: ''
      })

      response.json({ status: 200, message: "ok" })
    } catch (error) {
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  // 红娘发布客户
  public async createCustomerinfo({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      console.log(all);

      const id = await Database.table('customer_log').returning('id').insert({
        nickname: all.nickname,
        avatar_url: all.avatar_url || '',
        birthday: all.birthday || '',
        height: all.height,
        sex: all.sex,
        work: JSON.stringify(all.value || ''),
        photos: JSON.stringify(all.value || '')
      })

      const customer = await Database.table('customer').insert({
        user_wechat_open_id: all.openid,
        relation_log_id: id,
        relation: all.relation,
        introduction: all.introduction || ''
      })

      response.json({
        status: 200,
        message: "ok",
        data: customer
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  public async createCustomerList({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id', 'user_wechat_open_id', 'introduction', 'relation_log_id', 'relation_wechat_open_id').where('user_wechat_open_id', all.openid).orderBy('created_at', 'desc').limit(20)
      for (let index = 0; index < customer.length; index++) {
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('avatar_url', 'nickname', 'detail').where('id', customer[index].relation_log_id).first()
          }
        }
        if (customer[index].relation_wechat_open_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('avatar_url', 'nickname', 'detail').where('wechat_open_id', customer[index].relation_wechat_open_id).first()
          }
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: customer
      })
    } catch (error) {
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
