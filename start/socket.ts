import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';
Moment.locale('zh-cn')
import Jwt from 'App/Models/Jwt';
import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  try {
    const { sign, chat_id } = socket.handshake.headers
    const user = await Database.from('users').where('id', Jwt.verifyPublicKey(sign || '')).first()

    socket.on('send message', async (data) => {
      if (sign) {
        await Database.table('chats').insert({ chat_id: data.chat_id, user_id: user.user_id, chat_content: data.message, chat_content_type: data.type })

        const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type').where({ chat_id, status: 1 }).orderBy('created_at', 'asc')
        socket.broadcast.emit('messages', chats)
        socket.emit('messages', chats)
      }
    })

    const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type').where({ chat_id, status: 1 }).orderBy('created_at', 'asc')
    socket.emit('chat messages', chats)

    // 消息列表
    const chatroom = await Database.from('chatroom').where({ chat_users_id: user.user_id, status: 1 }).orderBy('created_at', 'asc')
    for (let index = 0; index < chatroom.length; index++) {
      chatroom[index].message = await Database.from('chats').select('chat_content').where({ chat_id: chatroom[index].chat_id, status: 1 }).orderBy('created_at', 'desc').first()
      chatroom[index].created_at = Moment(chatroom[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      chatroom[index].modified_at = Moment(chatroom[index].modified_at).format('YYYY-MM-DD HH:mm:ss')
    }
    socket.emit('chatroom', chatroom)

  } catch (error) {
    console.log(error);
  }
})
