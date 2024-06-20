'use strict'

import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';
Moment.locale('zh-cn');
import { v4 as uuidv4 } from 'uuid';

class ChatsroomController {
  async index({ request, response, view, session }: HttpContextContract) {
    try {
      const chatsroom = await Database.from('chatsroom').orderBy('modified_at', 'desc')
      for (var i = 0; i < chatsroom.length; i++) {
        chatsroom[i].chat_users = []
        chatsroom[i].chat_users[0] = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', chatsroom[i].chat_user_id).first() || {}
        chatsroom[i].chat_users[1] = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', chatsroom[i].chat_participant_users_id).first() || {}
        
        chatsroom[i]['created_at'] = Moment(chatsroom[i]['created_at']).format('YYYY-MM-DD HH:mm:ss')
        chatsroom[i]['modified_at'] = Moment(chatsroom[i]['modified_at']).fromNow()
      }

      return view.render('admin/chatsroom/index', {
        data: {
          title: '聊天',
          active: 'chatsroom',
          chatsroom
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  async edit({ params, request, response, view, session }: HttpContextContract) {
    try {
      var all = request.all()
      const chatsroom = await Database.from('chatsroom').where('chat_id', params.id).first()
      chatsroom['users'] = await Database.from('users').whereIn('user_id', [chatsroom.chat_user_id, chatsroom.chat_participant_users_id])

      chatsroom.chat_users_id = [chatsroom.chat_user_id, chatsroom.chat_participant_users_id]
      const users = await Database.from('users').select('user_id', 'nickname', 'avatar_url').whereIn('user_id', chatsroom.chat_users_id)
      const chats = await Database.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id: params.id, status: 1 }).orderBy('created_at', 'asc')
      for (let index = 0; index < chats.length; index++) {
        const indexOf = chatsroom.chat_users_id.indexOf(chats[index].user_id)
        if (indexOf != -1) {
          chats[index].userinfo = users[indexOf]
        }

        chats[index].created_at = Moment(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      chatsroom.chats = chats

      return view.render('admin/chatsroom/edit', {
        data: {
          title: `${ chatsroom.chat_name || '' }聊天`,
          active: 'chatsroom',
          chatsroom,
          users
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async store({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      switch (all.button) {
        case 'chatsroom':
          if (all.users.split(',').length >= 2) {
            const chat_id = uuidv4()
            await Database.table('chatsroom').insert({ chat_id, chat_users_id: all.users })
            session.flash('success', { type: 'success', header: '', message: `房间号「${ all.id }」更新成功。` })
          } else {
            session.flash('error', { type: 'error', header: '', message: `创建失败，房间需要 2 人以上，请插入多个 ID。` })
          }
          break;
          return response.redirect('back')
        case 'messages':
          if (all.user_id && all.content) {
            await Database.table('messages').insert({ content: all.content, user_id: all.user_id })
            session.flash('success', { type: 'success', header: '', message: `已为「${ all.user_id }」推送消息。` })
          } else {
            session.flash('error', { type: 'error', header: '', message: `推送消息失败，请检查。` })
          }
          return response.redirect('back')
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (all.chat_users_id.split(',').length >= 2) {
        await Database.from('chatsroom').where('chat_id', all.id).update({
          status: all.status,
          chat_name: all.name,
          chat_description: all.description,
          chat_users_id: all.chat_users_id
        })

        session.flash('success', { type: 'success', header: '', message: `房间号「${ all.id }」更新成功。` })
      } else {
        session.flash('error', { type: 'error', header: '', message: `创建失败，房间需要 2 人以上，请插入多个 ID。` })
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChatsroomController
