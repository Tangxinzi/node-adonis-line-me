import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';
import Jwt from 'App/Models/Jwt';
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  // socket.emit('news', { hello: 'hello world' })

  try {
    socket.on('send message', async (data) => {
      if (data.sign) {
        const user = await Database.from('users').where('id', Jwt.verifyPublicKey(data.sign || '')).first()
        await Database.table('chats').insert({ chat_id: 'test', user_id: user.user_id, chat_content: data.message, chat_content_type: data.type })
      }
    })
  } catch (error) {
    console.log(error);
  }
})
