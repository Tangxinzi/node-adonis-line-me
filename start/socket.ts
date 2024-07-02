import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment';
Moment.locale('zh-cn');
import Jwt from 'App/Models/Jwt';
import Ws from 'App/Services/Ws';
Ws.boot()

const Security = require('../app/Controllers/Http/lib/Security');

const getChatroom = async (user_id) => {
  try {
    const chatroom = await Database.from('chatsroom').where({ chat_user_id: user_id, status: 1 }).orWhere({ chat_participant_users_id: user_id, status: 1 }).orderBy('modified_at', 'desc')

    for (let index = 0; index < chatroom.length; index++) {
      chatroom[index].unread = await countUnread(user_id, chatroom[index].chat_id) // 统计未读
      chatroom[index].created_at = Moment(chatroom[index].created_at).format('YYYY-MM-DD')
      chatroom[index].modified_at = Moment(chatroom[index].modified_at).fromNow()
      chatroom[index].message = await Database.from('chats').select('user_id', 'chat_content_type', 'chat_content').where({ chat_id: chatroom[index].chat_id, status: 1 }).orderBy('created_at', 'desc').first()

      chatroom[index].chat_user_id = [chatroom[index].chat_user_id, chatroom[index].chat_participant_users_id]
      chatroom[index].user = await new Promise((resolve) => {
        chatroom[index].chat_user_id.map(async (item, key) => {
          if (item != user_id) {
            chatroom[index].user = await Database.from('users').select('type', 'avatar_url', 'nickname').where({ user_id: item }).first()
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
    const chatroom = await Database.from('chatsroom').where({ chat_id, status: 1 }).first()
    chatroom.chat_user_id = [chatroom.chat_user_id, chatroom.chat_participant_users_id]
    // const users = await Database.from('users').select('type', 'nickname', 'avatar_url').whereIn('user_id', chatroom.chat_user_id)
    const users = (await Database.rawQuery(`
      SELECT type, nickname, avatar_url from users WHERE user_id in (${ chatroom.chat_user_id.map(str => `'${str}'`).join(',') }) order by FIELD(user_id, ${ chatroom.chat_user_id.map(str => `'${str}'`).join(',') })
    `))[0]

    const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id, status: 1 }).orderBy('created_at', 'asc')
    for (let index = 0; index < chats.length; index++) {
      const indexOf = chatroom.chat_user_id.indexOf(chats[index].user_id)
      if (indexOf != -1) {
        chats[index].userinfo = users[indexOf]
      }

      if (chats[index].chat_content_type == 'customer') {
        chats[index].chat_content_type = 'text'
        const customer = await Database.from('customer').select('relation_user_id', 'relation_log_id').where({ id: chats[index].chat_content }).first() || {}
        // 红娘自行发布 / 关联已存在用户
        if (customer.relation_log_id) {
          const customer_log = await Database.from('customer_log').select('avatar_url', 'nickname').where('id', customer.relation_log_id).first()
          chats[index].chat_content = `Hi，我想认识您介绍的好友「${ customer_log.nickname }」😄`
        } else if (customer.relation_user_id) {
          const user = await Database.from('users').select('*').where('user_id', customer.relation_user_id).first()
          chats[index].chat_content = `Hi，我想认识您介绍的好友「${ user.nickname }」😄`
        }
      }

      if (chats[index].chat_content_type == 'share-customer') {
        const customer = await Database.from('customer').select('id', 'relation_user_id', 'relation_log_id').where({ id: chats[index].chat_content }).first() || {}

        // 红娘自行发布 / 关联已存在用户
        if (customer.relation_log_id) {
          chats[index].chat_content = await Database.from('customer_log').select('nickname', 'photos').where('id', customer.relation_log_id).first() || {}
          chats[index].chat_content.photos = chats[index].chat_content.photos ? JSON.parse(chats[index].chat_content.photos) : []
          chats[index].chat_content.id = customer.id
        } else if (customer.relation_user_id) {
          chats[index].chat_content = await Database.from('users').select('*').where('user_id', customer.relation_user_id).first()
          chats[index].chat_content.id = customer.id
        }
      }

      if (chats[index].chat_content_type == 'switch-customer') {
        const customer = await Database.from('customer').select('id', 'relation_user_id', 'relation_log_id').where({ id: chats[index].chat_content }).first() || {}

        // 红娘自行发布 / 关联已存在用户
        if (customer.relation_log_id) {
          chats[index].content = await Database.from('customer_log').select('nickname', 'photos').where('id', customer.relation_log_id).first() || {}
          chats[index].content.photos = chats[index].content.photos ? JSON.parse(chats[index].content.photos) : []
          chats[index].content.id = customer.id
        } else if (customer.relation_user_id) {
          chats[index].content = await Database.from('users').select('*').where('user_id', customer.relation_user_id).first()
          chats[index].content.id = customer.id
        }
      }

      chats[index].created_at = Moment(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss')
    }

    const customer = await Database.from('customer').select('id', 'relation_user_id', 'relation_log_id').where({ id: chatroom.customer_id || '', status: 1 }).first() || {}
    if (chatroom.customer_id && customer.relation_log_id) {
      // 红娘自行发布 / 关联已存在用户
      if (customer.relation_log_id) {
        customer.chat_content = await Database.from('customer_log').select('nickname', 'photos').where('id', customer.relation_log_id).first() || {}
        customer.chat_content.photos = customer.chat_content.photos ? JSON.parse(customer.chat_content.photos) : []
        customer.chat_content.id = customer.id
      } else if (customer.relation_user_id) {
        customer.chat_content = await Database.from('users').select('*').where('user_id', customer.relation_user_id).first()
        customer.chat_content.id = customer.id
      }
    }

    return {
      users,
      lists: chats,
      customer
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

const countUnread = async (user_id, chat_id) => {
  try {
    const chat_log = await Database.from('chats_log').whereIn('user_id', [user_id]).where({ chat_id, user_id }).first()
    if (chat_log) {
      const count = await Database.from('chats').where({ chat_id }).where('created_at', '>', chat_log.last_at).count('* as total')
      return count[0].total || 0
    }
  } catch (error) {
    console.log(error);
  }
}

const getMessages = async (user_id) => {
  try {
    const message = await Database.from('messages').select('content', 'created_at').where({ user_id, status: 1 }).orderBy('created_at', 'desc').first() || {}
    const messages_log = await Database.from('messages_log').where({ user_id }).first() || {}
    const count = await Database.from('messages').where({ user_id }).where('created_at', '>', messages_log.last_at).count('* as total')

    message.created_at = message.created_at ? Moment(message.created_at).fromNow() : ''

    return {
      notice: {
        ...message,
        unread: count[0].total || 0
      },
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

    // 在线用户
    socket.on('onlineChatroomUserID', (user_id) => {
      socket.join(user_id)
    });

    // tab 消息列表
    socket.on('chatsroom', async () => {
      // 获取消息列表和聊天室列表
      const messages = await getMessages(user.user_id);
      const chatroom = await getChatroom(user.user_id);

      // 发送消息列表和聊天室列表给客户端
      socket.emit('chatsroom list', {
        messages: messages,
        chatroom: chatroom
      });
    });

    // page 进入房间
    socket.on('joinChatroom', (room) => {
      socket.join(room)
    });

    // page 初次进入消息数据
    socket.on('chat list', async (room, data) => {
      if (chat_id) {
        // page log 进入房间时间更新
        await lastJoinChat(user, chat_id)

        const chats = await getChatsMessage(data, chat_id)
        socket.to(room).emit('messages', chats)
        socket.broadcast.to(room).emit('messages', chats)
      }
    })

    // page 用户更新离开房间最后时间
    socket.on('chat leave', async () => {
      if (chat_id) {
        await lastJoinChat(user, chat_id)
      }
    })

    // 发送消息
    socket.on('send message', async (room, data) => {
      if (chat_id) {
        // tab 更新房间最后发送时间
        await Database.from('chatsroom').where({ chat_id, status: 1 }).update({ modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })

        // page log 进入房间时间更新
        await lastJoinChat(user, chat_id)

        // page 发送消息后返回消息数据
        if (data.type == 'switch-customer') {
          await Database.from('chatsroom').where({ chat_id, chat_user_id: user.user_id }).orWhere({ chat_id, chat_participant_users_id: user.user_id }).update({
            customer_id: data.message,
            modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
          })
        }
        const rows = await Database.table('chats').insert({ chat_id, user_id: user.user_id, chat_content: data.message, chat_content_type: data.type, chat_ip: socket.handshake.headers['x-real-ip'] })
        await Security.center({
          review: {
            scene: 1, content: data.message, openid: user.wechat_open_id, type: data.type
          },
          database: {
            table: 'chats', field: 'chat_content', table_id: rows[0], user_id: user.user_id
          }
        })

        const chats = await getChatsMessage(data, chat_id)
        socket.to(room).emit('messages lists', chats)
        socket.broadcast.to(room).emit('messages lists', chats)

        // tab 消息列表
        const chatroom = await Database.from('chatsroom').where({ chat_id, type: user.type, status: 1 }).first()
        chatroom.chat_user_id = [chatroom.chat_user_id, chatroom.chat_participant_users_id]
        for (let index = 0; index < chatroom.chat_user_id.length; index++) {
          const user_id = chatroom.chat_user_id[index];
          // socket.emit('chatsroom list', await getChatroom(user_id))
          socket.broadcast.to(user_id).emit('chatsroom list', {
            messages: await getMessages(user_id),
            chatroom: await getChatroom(user_id)
          })
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
});
