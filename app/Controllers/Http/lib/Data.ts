import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';

function record(data) {
  return new Promise(async (resolve, reject) => {
    try {
      // category: 0 - 访问用户主页；1 - 查看用户时长；2 - 分享转发被查看；3 - 通过聊天相关被查看
      if (data.user_id || data.wechat_open_id) resolve(false)
      const datas = await Database.from('datas').where({ table: data.table, field: data.field, field_value: data.field_value, user_id: data.user_id || '', wechat_open_id: data.wechat_open_id || '', category: data.category }).orderBy('created_at', 'desc').first() || {}
      const milliseconds = Moment().diff(datas.created_at, 'milliseconds')
      console.log('data milliseconds', data, milliseconds);

      if (milliseconds == 0 || milliseconds > 100 * 1000) {
        await Database.table('datas').insert({ table: data.table, field: data.field, field_value: data.field_value, user_id: data.user_id || '', wechat_open_id: data.wechat_open_id || '', category: data.category, count: data.count })
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      console.log(error);
      reject(error)
    }
  });
}

module.exports = {
  record
}
