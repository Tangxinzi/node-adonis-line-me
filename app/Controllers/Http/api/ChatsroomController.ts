import Env from '@ioc:Adonis/Core/Env';
import Database from '@ioc:Adonis/Lucid/Database'
import RandomString from 'randomstring';
import Moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default class ChatsroomController {
  // 连接聊天对话 chat_id
  public async chat({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all(), chat_id = null

      // 对话 user id 不能为自己
      if (session.get('user_id') == all.user_id) {
        return response.json({
          status: 500,
          message: "internalServerError",
          data: 'Unable to chat with oneself'
        })
      }

      // user id 不能异常      
      const users = await Database.from('users').whereIn('user_id', [session.get('user_id'), all.user_id]).where('status', 1)
      if (users.length != 2) {
        return response.json({
          status: 500,
          message: "internalServerError",
          data: 'chat user_id error'
        })
      }

      const chatroom = await Database.from('chatsroom').where({ chat_user_id: session.get('user_id'), chat_participant_users_id: all.user_id, status: 1 }).orWhere({ chat_user_id: all.user_id, chat_participant_users_id: session.get('user_id'), status: 1 }).first() || {}
      if (chatroom.id) {
        chat_id = chatroom.chat_id
      } else {
        chat_id = uuidv4()
        await Database.table('chatsroom').insert({ chat_id, chat_user_id: session.get('user_id'), chat_participant_users_id: all.user_id, type: users[0].type }) // 发起类型：1 - 用户；2 - 红娘
      }

      return response.json({
        status: 200,
        message: "ok",
        data: {
          chat_id
        }
      })
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        message: "internalServerError"
      })
    }
  }

  // 发送消息
  public async send({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const chatroom = await Database.from('chatsroom').where({  chat_id: all.chat_id, status: 1, chat_user_id: session.get('user_id') }).orWhere({ chat_id: all.chat_id, status: 1, chat_participant_users_id: session.get('user_id') }).first()
      console.log(chatroom);
      
      if (chatroom.id) {
        await Database.from('chatsroom').where({ chat_id: chatroom.chat_id, status: 1 }).update({ modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
        await Database.from('chats_log').where({ chat_id: chatroom.chat_id, user_id: session.get('user_id') }).update({ last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })

        const id = await Database.table('chats').insert({ chat_id: chatroom.chat_id, user_id: session.get('user_id'), chat_content: all.chat_content, chat_content_type: all.chat_content_type, chat_ip: request.ip() })
        return response.json({
          status: 200,
          message: "ok",
          data: id
        })  
      }

      return response.json({
        status: 500,
        message: "error"
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  public async messages({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), user_id = session.get('user_id')
      const messages = await Database.from('messages').where({ user_id, status: 1 }).orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
      const messages_log = await Database.from('messages_log').where({ user_id }).first() || {}
      if (messages_log.id) {
        await Database.from('messages_log').where({ user_id }).update({ last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      } else {
        await Database.table('messages_log').insert({ user_id, last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      }

      for (let index = 0; index < messages.length; index++) {
        messages[index].created_at = Moment(messages[index].created_at).format('YYYY-MM-DD HH:mm:ss')        
      }

      return response.json({
        status: 200,
        message: "ok",
        data: messages
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }
}
