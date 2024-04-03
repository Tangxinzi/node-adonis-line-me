import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';

const { percentUserinfo } = require('../lib/Percent');
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
        var authentication = await Database.from('verification').select('id', 'value', 'created_at').where({ 
          user_id: session.get('user_id'), 
          verification_status: 'pending', 
          is_verified: 0,
          table: params.table || '',
          field: params.field || ''
        }).orderBy('created_at', 'desc').first()
        case 'authentication_log':
          var authentication = await Database.from('verification').select('id', 'value', 'created_at').where({ 
            user_id: session.get('user_id'), 
            verification_status: 'pending', 
            is_verified: 0,
            table: params.table || '',
            // field: params.field || ''
          }).orderBy('created_at', 'desc').first()
          break;
        case 'customer':
          var authentication = await Database.from('verification').select('id', 'value', 'created_at').where({ 
            user_id: session.get('user_id'), 
            verification_status: 'pending', 
            is_verified: 0,
            table: params.table || ''
          }).orderBy('created_at', 'desc')
          break;
        
        default:
          var authentication = null
          break;
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
}
