import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';

export default class EventController {
  public async dataType({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (params.type == 'answer') {
        const answer = await Database.from('answer').where({ id: all.id }).first()
        switch (all.button) {
          case 'recommend':
            await Database.from('answer').where({ id: all.id }).update({ recommend: !answer.recommend })
            break;
          case 'delete':
            await Database.from('answer').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD hh:mm:ss') })
            break;
        }
      }

      if (params.type == 'moment') {
        const moments = await Database.from('moments').where({ id: all.id }).first()
        switch (all.button) {
          case 'recommend':
            await Database.from('moments').where({ id: all.id }).update({ recommend: !moments.recommend })
            break;
          case 'delete':
            await Database.from('moments').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD hh:mm:ss') })
            break;
        }
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }

  public async descovery({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.recommend',  'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('moments.created_at', 'desc')
      const answer = await Database.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.recommend', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('answer.created_at', 'desc')

      let descovery = []
      for (let index = 0; index < 10; index++) {
        // moment
        if (moments[index]) {
          const like = await Database.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1, user_id: session.get('user_id') || '' }).first()
          descovery.push({
            id: moments[index].id,
            recommend: moments[index].recommend,
            user_id: moments[index].user_id,
            nickname: moments[index].nickname,
            avatar_url: moments[index].avatar_url,
            sex: moments[index].sex,
            title: '发布了动态',
            content: moments[index].content,
            photos: moments[index].photos ? JSON.parse(moments[index].photos) : [],
            age: Moment().diff(moments[index].birthday, 'years'),
            data_type: 'moment',
            like: like && like.id ? true : false,
            likeNum: (await Database.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
            commentNum: (await Database.from('comments').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
            ip: moments[index].ip,
            created_at: Moment(moments[index].created_at).format('YYYY-MM-DD')
          })
        }

        // answer
        if (answer[index]) {
          const like = await Database.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1, user_id: session.get('user_id') || '' }).first()
          const question = await Database.from('questions').select('title').where('id', answer[index].relation_question_id).first()
          descovery.push({
            id: answer[index].id,
            recommend: answer[index].recommend,
            user_id: answer[index].user_id,
            nickname: answer[index].nickname,
            avatar_url: answer[index].avatar_url,
            sex: answer[index].sex,,
            title: '回答了「' + question.title + '」',
            content: answer[index].content,
            photos: answer[index].photos ? JSON.parse(answer[index].photos) : [],
            age: Moment().diff(answer[index].birthday, 'years'),
            data_type: 'answer',
            like: like && like.id ? true : false,
            likeNum: (await Database.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
            commentNum: (await Database.from('comments').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
            ip: answer[index].ip,
            created_at: Moment(answer[index].created_at).format('YYYY-MM-DD')
          })
        }
      }

      return view.render('admin.event.descovery', {
        data: {
          title: '发现',
          active: 'descovery',
          descovery
        }
      })
    } catch (error) {
      console.log(error);

    }
  }
}
