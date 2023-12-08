import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';

function regularData(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const verified = await Database.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, is_verified: 0 }).orderBy('modified_at', 'desc').first() || {}
      if (verified.id) {
        await Database.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, is_verified: 0 }).update({
          before: data.before,
          value: data.value,
          is_verified: 0,
          verification_status: 'pending'
        })
        resolve()
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
        switch (`${ data.table }.${ data.field }`) {
          case 'customer.':
            data.value = JSON.parse(data.value)
            await Database.from('customer').where('id', data.value.customer_id).update({ status: 2 })
            break;
        }
      }

      // 通过
      if (result && value.verification_status == 'approved') {
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
        }
      }

      resolve(true)
    } catch (error) {
      reject(error)
    }
  });
}

module.exports = {
  regularData,
  action
}
