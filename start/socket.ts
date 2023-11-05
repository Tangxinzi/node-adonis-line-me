import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';
Moment.locale('zh-cn');
import Jwt from 'App/Models/Jwt';
import Ws from 'App/Services/Ws';
Ws.boot()

const getChatroom = async (user) => {
  try {
    const chatroom = await Database.from('chatroom').whereILike('chat_users_id', '%' + user.user_id + '%').where({ status: 1 }).orderBy('modified_at', 'desc')
    for (let index = 0; index < chatroom.length; index++) {
      chatroom[index].unread = await countUnread(user.user_id, chatroom[index].chat_id) // 统计未读
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
  } catch (error) {
    console.log(error);
  }
}

const getChatsMessage = async (data, chat_id) => {
  try {
    const chatroom = await Database.from('chatroom').where({ chat_id, status: 1 }).first()
    chatroom.chat_users_id = chatroom.chat_users_id.split(',')
    const users = await Database.from('users').select('nickname', 'avatar_url').whereIn('user_id', chatroom.chat_users_id)

    const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id, status: 1 }).orderBy('created_at', 'asc')
    for (let index = 0; index < chats.length; index++) {
      const indexOf = chatroom.chat_users_id.indexOf(chats[index].user_id)
      if (indexOf != -1) {
        chats[index].userinfo = users[indexOf]
      }

      chats[index].created_at = Moment(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss')
    }

    return {
      users,
      lists: chats
    }
  } catch (error) {
    console.log(error);
  }
}

const lastJoinChat = async (user, chat_id) => {
  try {
    const chat_log = await Database.from('chats_log').where({ chat_id, user_id: user.user_id }).first()
    if (chat_log) {
      await Database.from('chats_log').where({ chat_id, user_id: user.user_id }).update({ last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
    } else {
      await Database.table('chats_log').insert({ chat_id, user_id: user.user_id, last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
    }
  } catch (error) {
    console.log(error);
  }
}

const countUnread = async (user_id, chat_id)  => {
  try {
    const chat_log = await Database.from('chats_log').whereIn('user_id', [user_id]).where({ chat_id, user_id }).first()
    if (chat_log) {
      const count = await Database.from('chats').where({ chat_id }).where('created_at', '>', chat_log.last_at).count('* as total')
      return count[0].total || 0
    } else {

    }

  } catch (error) {
    console.log(error);
  }
}

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {
  try {
    const { sign, chat_id } = socket.handshake.query;
    const user = await Database.from('users').where('id', Jwt.verifyPublicKey(sign)).first();

    // page 进入房间
    socket.on('joinChatroom', (room) => {
      socket.join(room)
    })

    // tab 消息列表
    socket.on('chatroom', async (data) => {
      socket.emit('chatroom list', await getChatroom(user))
    }

    // page 初次进入消息数据
    socket.on('chat list', async (data) => {
      if (chat_id) {
        // page log 进入房间时间更新
        await lastJoinChat(user, chat_id)

        const chats = await getChatsMessage(data, chat_id)
        socket.emit('messages', chats)
        socket.broadcast.emit('messages', chats)
      }
    }

    socket.on('send message', async (room, data) => {
      console.log(room);

      if (chat_id) {
        // tab 更新房间最后发送时间
        await Database.from('chatroom').where({ chat_id, status: 1 }).update({ modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })

        // page log 进入房间时间更新
        await lastJoinChat(user, chat_id)

        // page 发送消息后返回消息数据
        await Database.table('chats').insert({ chat_id, user_id: user.user_id, chat_content: data.message, chat_content_type: data.type, chat_ip: socket.handshake.headers['x-real-ip'] })
        const chats = await getChatsMessage(data, chat_id)
        socket.to(room).emit('messages lists', chats)
        socket.broadcast.to(room).emit('messages lists', chats)

        // tab 消息列表
        socket.to(room).emit('chatroom list', await getChatroom(user))
        socket.broadcast.to(room).emit('chatroom list', await getChatroom(user))
      }
    })
  } catch (error) {
    console.log(error);
  }
})
