import Database from '@ioc:Adonis/Lucid/Database';

function push(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await Database.table('messages').insert({ content: data.content, user_id: data.user_id })
      if (id) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  });
}

module.exports = {
  push
}
