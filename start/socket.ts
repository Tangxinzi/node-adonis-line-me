import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';
Moment.locale('zh-cn');
import Jwt from 'App/Models/Jwt';
import Ws from 'App/Services/Ws';
Ws.boot()

const getChatroom = async (user) => {
  const chatroom = await Database.from('chatroom').whereILike('chat_users_id', '%' + user.user_id + '%').where({ status: 1 }).orderBy('created_at', 'asc')
  for (let index = 0; index < chatroom.length; index++) {
    chatroom[index].created_at = Moment(chatroom[index].created_at).format('YYYY-MM-DD')
    chatroom[index].modified_at = Moment(chatroom[index].modified_at).fromNow()
    chatroom[index].message = await Database.from('chats').select('chat_content_type', 'chat_content').where({ chat_id: chatroom[index].chat_id, status: 1 }).orderBy('created_at', 'desc').first()
    chatroom[index].chat_users_id = chatroom[index].chat_users_id.split(',')
    chatroom[index].user = await new Promise((resolve) => {
      chatroom[index].chat_users_id.map(async (item, key) => {
        if (item != user.user_id) {
          chatroom[index].user = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: item }).first()
          resolve(chatroom[index].user)
        }
      })
    })
  }

  return chatroom
}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  try {
    const { sign, chat_id } = socket.handshake.query;
    const user = await Database.from('users').where('id', Jwt.verifyPublicKey(sign)).first();

    socket.on('chatroom', async (data) => {
      socket.emit('chatroom list', await getChatroom(user))
    }

    socket.on('chat list', async (data) => {
      if (data.chat_id) {
        const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type').where({ chat_id: data.chat_id, status: 1 }).orderBy('created_at', 'asc')
        socket.broadcast.emit('messages', chats)
        socket.emit('messages', chats)
      }
    }

    socket.on('send message', async (data) => {
      if (data.chat_id) {
        await Database.from('chatroom').where({ chat_id }).update({ modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })

        await Database.table('chats').insert({ chat_id: data.chat_id, user_id: user.user_id, chat_content: data.message, chat_content_type: data.type, chat_ip: socket.handshake.headers['x-real-ip'] })
        const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type').where({ chat_id: data.chat_id, status: 1 }).orderBy('created_at', 'asc')
        socket.broadcast.emit('messages lists', chats)
        socket.emit('messages lists', chats)

        socket.emit('chatroom list', await getChatroom(user))
        socket.broadcast.emit('chatroom list', await getChatroom(user))
      }
    })
  } catch (error) {
    console.log(error);
  }
})
