import Database from '@ioc:Adonis/Lucid/Database'
const { msgSecCheck, mediaCheck } = require('./Weixin')

exports.center = function (data) {
  return new Promise(async (resolve, reject) => {
    try {
      let result = ''
      if (data.review.type == 'text') {
        result = await msgSecCheck({ ...data.review })

        if (result.result.suggest != 'pass') {
          await Database.table('security').insert({
            security_type: 'text',
            table: data.database.table,
            field: data.database.field,
            table_id: data.database.table_id,
            user_id: data.database.user_id,
            content: data.review.content || ''
          })
        }
      }

      if (data.review.type == 'image') {
        data.review.media_type = 2
        result = await mediaCheck({ ...data.review })
      }

      console.log(data, result);

      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
