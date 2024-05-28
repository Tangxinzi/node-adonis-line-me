import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';

const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const Verification = require('../lib/Verification');

export default class OperatesController {
  public async authenticationVerification({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all(), data = {}
      if (request.method() == 'POST') {
        const authentication = await Database.from('authentication').where({ user_id: session.get('user_id') }).first() || {}
        const authentication_log = await Database.from('authentication_log').where({ user_id: session.get('user_id') }).first() || {}
        if (!authentication.id && !authentication_log.id) {
          await Database.table('authentication').insert({ user_id: session.get('user_id') })

          switch (all.type) {
            case 'idcard':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), idcard: all.value })
              break;
            case 'school':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), school: all.value })
              break;
            case 'company':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), company: all.value })
              break;
            case 'work':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), work: all.value })
              break;
            case 'job_title':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), job_title: all.value })
              break;
            case 'salary':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), salary: all.value })
              break;
          }
        }

        switch (all.type) {
          case 'idcard':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ idcard: all.value })
            break;
          case 'school':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ school: all.value })
            break;
          case 'company':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ company: all.value })
            break;
          case 'work':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ work: all.value })
            break;
          case 'job_title':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ job_title: all.value })
            break;
          case 'salary':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ salary: all.value })
            break;
        }

        // 加入审核
        await Verification.regularData({
          user_id: session.get('user_id'),
          table: 'authentication_log',
          field: all.type,
          before: '',
          value: all.value,
          ip: request.ip()
        })
      }

      if (request.method() == 'GET') {
        // 状态：0 - 审核中，1 - 已通过，默认未提交
        const authentication = await Database.from('authentication').where({ user_id: all.user_id || session.get('user_id') }).first() || {}
        data = {
          ...authentication
          // idcard: authentication.idcard == 1 ? 'approved' : (authentication_log.idcard ? 'pending' : ''),
          // school: authentication.school == 1 ? 'approved' : (authentication_log.school ? 'pending' : ''),
          // company: authentication.company == 1 ? 'approved' : (authentication_log.company ? 'pending' : ''),
          // work: authentication.work == 1 ? 'approved' : (authentication_log.work ? 'pending' : ''),
          // job_title: authentication.job_title == 1 ? 'approved' : (authentication_log.job_title ? 'pending' : ''),
          // salary: authentication.salary == 1 ? 'approved' : (authentication_log.salary ? 'pending' : ''),
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async pendingType({ params, response, session }: HttpContextContract) {
    try {
      switch (`${ params.table }`) {
        case `users`:
          var authentication = await Database.from('verification').select('id', 'value', 'table', 'field', 'created_at').where({ 
            user_id: session.get('user_id'), 
            verification_status: 'pending', 
            is_verified: 0,
            table: params.table || '',
            field: params.field || ''
          }).orderBy('created_at', 'desc').first()
          break;
        case 'authentication_log':
          var authentication = await Database.from('verification').select('id', 'value', 'table', 'field', 'created_at').where({ 
            user_id: session.get('user_id'), 
            verification_status: 'pending', 
            is_verified: 0,
            table: params.table || '',
            // field: params.field || ''
          }).orderBy('created_at', 'desc').first()
          break;
        case 'customer':
          var authentication = await Database.from('verification').select('id', 'value', 'table', 'field', 'created_at').where({ 
            user_id: session.get('user_id'), 
            verification_status: 'pending', 
            is_verified: 0,
            table: params.table || ''
          }).orderBy('created_at', 'desc')

          for (let index = 0; index < authentication.length; index++) {
            authentication[index].value = JSON.parse(authentication[index].value)
          }
          break;
        default:
          var authentication = null
          break;
      }

      for (let index = 0; index < authentication.length; index++) {
        authentication[index].field = await Verification.field(`${ authentication[index].table }.${ authentication[index].field }`)
        authentication[index].text = authentication[index].field[0] + authentication[index].field[1]
        delete authentication[index].table
        delete authentication[index].field
        authentication[index].created_at = Moment(authentication[index].created_at).fromNow()
      }
      
      return response.json({
        status: 200,
        message: "ok",
        data: authentication
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async incentive({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), operates_log = (await Database.rawQuery(`
          SELECT 
            users_operates_log.id AS id, 
            users_operates_log.customer_id, 
            users_operates_log.customer_log_id, 
            users_operates_log.user_id, 
            users_operates_log.loading, 
            users_operates_log.price, 
            customer.recommend, 
            customer.introduction, 
            customer.verify_phone, 
            customer.recommend_at, 
            customer.status AS c_status,
            users.avatar_url, 
            users.nickname, 
            users.phone,
            users_operates_log.created_at
          FROM users_operates_log 
          LEFT JOIN customer ON users_operates_log.customer_id = customer.id 
          LEFT JOIN users ON users_operates_log.user_id = users.user_id
          WHERE users_operates_log.user_id = '${ session.get('user_id') }' AND customer.status IN (${ all.orderBy || '1' })
          ORDER BY users_operates_log.id DESC
          LIMIT ${ request.input('page', 0) * 15 }, 15
      `))[0]

      for (let index = 0; index < operates_log.length; index++) {
        if (operates_log[index].customer_log_id) {
          if (operates_log[index].verify_phone) {
            operates_log[index].verify_phone = true
          } else {
            operates_log[index].verify_phone = false
          }

          operates_log[index] = {
            ...operates_log[index],
            percent: await percentCustomerinfo(operates_log[index].customer_log_id),
            customer: {
              ...await Database.from('customer_log').select('avatar_url', 'nickname', 'sex', 'work', 'company', 'birthday', 'phone', 'photos', 'location').where('id', operates_log[index].customer_log_id).first() || {}
            }
          }
        }

        operates_log[index].created_at = Moment(operates_log[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        operates_log[index].modified_at = Moment(operates_log[index].modified_at).format('YYYY-MM-DD HH:mm:ss')
      }
      
      return response.json({
        status: 200,
        message: "ok",
        data: {
          operates_log,
          onboard: (await Database.rawQuery(`
            SELECT data.type, data.value, data.text, data.unit FROM (
              SELECT 'customer' AS type, count(*) AS value, '介绍' AS text, '' AS unit FROM users_operates_log LEFT JOIN customer ON users_operates_log.customer_id = customer.id WHERE users_operates_log.user_id = '${ session.get('user_id') }' AND customer.status IN (${ all.orderBy || '1' })
              UNION ALL
              SELECT 'price' AS type, sum(0) AS value, '待入账' AS text, '' AS unit FROM users_operates_log WHERE user_id = '${ session.get('user_id') }'
            ) AS data
          `))[0],
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
