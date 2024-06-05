import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';
const Messages = require('./Messages');

function regularData(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const verified = await Database.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, value: data.value, is_verified: 0 }).orderBy('modified_at', 'desc').first() || {}
      if (verified.id) {
        const verification = await Database.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, is_verified: 0 }).update({
          before: data.before,
          value: data.value,
          is_verified: 0,
          verification_status: 'pending'
        })
        resolve(verification)
      } else {
        const id = await Database.table('verification').insert({ user_id: data.user_id, table: data.table, before: data.before, field: data.field, value: data.value, ip: data.ip }).returning('id')
        resolve(id)
      }
    } catch (error) {
      reject(error)
    }
  });
}

function action(data, value) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!value.verification_user_id || !value.verification_status) {
        resolve(false)
        return
      }

      if (value.verification_status == 'rejected' && value.verification_comment == '') {
        resolve(false)
        return
      }

      const result = await Database.from('verification').where({ id: value.id, is_verified: 0 }).update({
        is_verified: 1,
        verification_comment: value.verification_comment || '',
        verification_status: value.verification_status,
        verification_user_id: value.verification_user_id,
        modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
      })

      // 拒绝
      if (result && value.verification_status == 'rejected') {
        await Messages.push({ user_id: data.user_id, content: `您提交的认证信息被拒绝，请重新提交。原因：${ value.verification_comment }` }) // 拒绝
        switch (`${ data.table }.${ data.field }`) {
          case 'customer.':
            data.value = JSON.parse(data.value)
            await Database.from('customer').where('id', data.value.customer_id).update({ status: 2 })
            break;
          case 'authentication_log.idcard':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ idcard: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ idcard: '' })
            break;
          case 'authentication_log.school':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ school: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ school: '' })
            break;
          case 'authentication_log.company':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ company: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ company: '' })
            break;
          case 'authentication_log.work':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ work: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ work: '' })
            break;
          case 'authentication_log.job_title':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ job_title: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ job_title: '' })
            break;
          case 'authentication_log.salary':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ salary: '' })
            await Database.from('authentication_log').where({ user_id: data.user_id }).update({ salary: '' })
            break;
        }
      }

      // 通过
      if (result && value.verification_status == 'approved') {
        await Messages.push({ user_id: data.user_id, content: '您提交的认证信息已通过。' }) // 通过
        switch (`${ data.table }.${ data.field }`) {
          case 'users.avatar_url':
            await Database.from('users').where('user_id', data.user_id).update({ avatar_url: data.value })
            break;
          case 'users.photos':
            await Database.from('users').where('user_id', data.user_id).update({ photos: data.value })
            break;
          case 'customer.':
            data.value = JSON.parse(data.value)
            await Database.from('customer').where('id', data.value.customer_id).update({ status: 1 })
            break;
          case 'authentication_log.idcard':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ idcard: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ idcard: 1 })
            break;
          case 'authentication_log.school':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ school: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ school: 1 })
            break;
          case 'authentication_log.company':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ company: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ company: 1 })
            break;
          case 'authentication_log.work':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ work: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ work: 1 })
            break;
          case 'authentication_log.job_title':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ job_title: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ job_title: 1 })
            break;
          case 'authentication_log.salary':
            await Database.from('authentication').where({ user_id: data.user_id }).update({ salary: 1 })
            await Database.from('authentication').where({ user_id: data.user_id }).update({ salary: 1 })
            break;
        }
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  });
}

function field(field) {
  let result = ['', '']

  switch (field) {
    case 'customer.':
      result = ['介绍好友', '']
      break;
    case 'users.avatar_url':
      result = ['用户信息', '头像']  
      break;
    case 'users.photos':
      result = ['用户信息', '照片集']
      break;
    case 'authentication_log.idcard':
      result = ['认证审核', '用户身份']
      break;
    case 'users.photos':
      result = ['用户信息', '照片集']
      break;
    case 'users.photos':
      result = ['用户信息', '照片集']
      break;
    case 'users.photos':
      result = ['用户信息', '照片集']
      break;
    case 'authentication_log.idcard':
      result = ['认证审核', '用户身份']
      break;
    case 'authentication_log.school':
      result = ['认证审核', '学校']
      break;
    case 'authentication_log.company':
      result = ['认证审核', '公司']
      break;
    case 'authentication_log.work':
      result = ['认证审核', '行业']
      break;
    case 'authentication_log.job_title':
      result = ['认证审核', '职位']
      break;
    case 'authentication_log.salary':
      result = ['认证审核', '薪资']
      break;
  }

  return result
}

module.exports = {
  regularData,
  action,
  field
}
