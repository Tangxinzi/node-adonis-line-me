import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
import zpData from '../lib/Zhipin'
import { percentUserinfo, percentCustomerinfo } from '../lib/Percent'
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
const defaultFilter = {
  sex: '',
  age: [25, 30],
  distance: 10,
  location: 0
}

export default class FiltersController {
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

  // 用户筛选
  public async customer({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all(), filter = await Database.from('users_filter').where('user_id', session.get('user_id')).first() || {}

      if (all.type == 'match') {
        filter.sex = all.sex, filter.age = [parseInt(all.age) - 5, parseInt(all.age) + 5]
      } else if (filter.id) {
        filter.age = filter.age.split(',')
      } else {
        filter = defaultFilter
      }

      let ageWhereSql = `(DATE_FORMAT(NOW(), '%Y-%m-%d') - DATE_FORMAT(IFNULL(customer_log.birthday, users.birthday), '%Y-%m-%d') BETWEEN ${ filter.age[0] } AND ${ filter.age[1] }) AND`

      let customer = (await Database.rawQuery(`
        SELECT
          customer.id as cid,
          customer.user_id,
          IFNULL(customer_log.sex, users.sex) AS sex,
        	IFNULL(customer_log.nickname, users.nickname) AS nickname,
        	IFNULL(customer_log.avatar_url, users.avatar_url) AS avatar_url,
        	IFNULL(customer_log.birthday, users.birthday) AS birthday,
        	IFNULL(customer_log.height, users.height) AS height,
        	IFNULL(customer_log.weight, users.weight) AS weight,
        	IFNULL(customer_log.work, users.work) AS work,
          users.job_title,
        	IFNULL(customer_log.photos, users.photos) AS photos,
        	IFNULL(customer_log.videos, users.videos) AS videos,
        	IFNULL(customer_log.detail, users.detail) AS detail,
        	IFNULL(customer_log.expectation, users.expectation) AS expectation,
        	IFNULL(customer_log.contact_wechat, users.contact_wechat) AS contact_wechat,
        	IFNULL(customer_log.company, users.company) AS company,
        	IFNULL(customer_log.school, users.school) AS school,
        	IFNULL(customer_log.location, users.location) AS location,
        	IFNULL(customer_log.salary, users.salary) AS salary,
          customer.relation,
          customer.introduction,
        	customer.created_at
        FROM customer
        LEFT JOIN customer_log ON customer.relation_user_id IS NULL AND customer.relation_log_id = customer_log.id
        LEFT JOIN users ON customer.relation_user_id IS NOT NULL AND customer.relation_user_id = users.user_id
        WHERE ` + ageWhereSql + ` customer.status = 1 AND customer.recommend = 1 AND customer.deleted_at IS NULL AND (customer_log.sex IN (${ filter.sex || '0, 1' }) OR users.sex IN (${ filter.sex || '0, 1' }))
        LIMIT 20
      `))[0]
      // ORDER BY RAND()

      for (let index = 0; index < customer.length; index++) {
        // 介绍人
        customer[index].parent = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first()

        // 格式数据
        customer[index].like = await Database.from('likes').select('id').where({ status: 1, type: 'customer', relation_type_id: customer[index].cid, user_id: session.get('user_id') }).first() || {}
        customer[index].location = customer[index].location ? JSON.parse(customer[index].location) : []
        customer[index].photos = customer[index].photos ? JSON.parse(customer[index].photos) : []
        customer[index].videos = customer[index].videos ? JSON.parse(customer[index].videos) : []
        customer[index].zodiac_sign = this.getZodiacSign(Moment(customer[index].birthday).format('DD'), Moment(customer[index].birthday).format('MM'))
        customer[index].age = Moment().diff(customer[index].birthday, 'years')
        customer[index].relation = RELATION[customer[index].relation]
        customer[index].salary = customer[index].salary ? SALARY_RANGE[customer[index].salary].value : ''
        customer[index].work = customer[index].work ? JSON.parse(customer[index].work) : []
        if (customer[index].work.value) {
          customer[index].work.text = await zpData.data(customer[index].work.value[0], customer[index].work.value[1])
        }
        customer[index].created_at = Moment(customer[index].created_at).format('YYYY-MM-DD')
      }

      return response.json({ status: 200, message: "ok", data: customer || [] })
    } catch (error) {
      console.log(error);
    }
  }

  public async index({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), filter = await Database.from('users_filter').where('user_id', session.get('user_id')).first() || {}

      if (request.method() == 'GET') {
        if (filter.id) {
          filter.age = filter.age.split(',')
        } else {
          filter = defaultFilter
        }

        return response.json({ status: 200, message: "ok", data: filter })
      }

      if (request.method() == 'POST') {
        if (filter) {
          const result = await Database.from('users_filter').where({ user_id: session.get('user_id') }).update({
            sex: all.sex,
            age: all.age.toString(),
            distance: all.distance,
            location: all.location,
            modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
          })
          return response.json({ status: 200, message: "ok", data: result })
        } else {
          const id = await Database.table('users_filter').insert({
            user_id: session.get('user_id'),
            sex: all.sex,
            age: all.age.toString(),
            distance: all.distance,
            location: all.location,
          })
          return await Database.from('users_filter').where('id', id[0]).first()
        }
      }
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
