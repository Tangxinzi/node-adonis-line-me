import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';
import GeoIP from 'geoip-lite';
import zpData from '../lib/Zhipin';

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
            await Database.from('answer').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
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
            await Database.from('moments').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
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
      const all = request.all(), data = { moments: [], answer: [] }
      let subtitle = { text: '', value: '' }

      switch (all.type) {
        case 'moments':
          subtitle.text = ' - 动态'
          subtitle.value = all.type
          data.moments = await Database.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.recommend',  'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('moments.created_at', 'desc')
          break;
        case 'answer':
          subtitle.text = ' - 问答'
          subtitle.value = all.type
          data.answer = await Database.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.recommend', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('answer.created_at', 'desc')
          break;
        default:
          subtitle.value = 'all'
          data.answer = await Database.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.recommend', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('answer.created_at', 'desc')
          data.moments = await Database.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.recommend',  'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('moments.created_at', 'desc')
          break;
      }

      const descovery = (await Database.rawQuery(`
        SELECT am.type, am.id, am.recommend, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.ip, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'answer' AS type, id, recommend, user_id, '' AS title, content, photos, relation_question_id AS relation_id, ip, created_at
            FROM answer
            WHERE status = 1 AND type = 0
            UNION
            SELECT 'moment' AS type, id, recommend, user_id, '' AS title, content, photos, '' AS relation_id, ip, created_at
            FROM moments
            WHERE status = 1
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.recommend, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.ip, am.created_at
        ORDER BY am.created_at DESC
        LIMIT 20 OFFSET ${ request.input('page', 0) }
      `))[0]

      for (let index = 0; index < descovery.length; index++) {
        descovery[index].photos = JSON.parse(descovery[index].photos)
        descovery[index].location = descovery[index].location ? JSON.parse(descovery[index].location) : {}
        descovery[index].age = Moment().diff(descovery[index].birthday, 'years')
        descovery[index].created_at = Moment(descovery[index].created_at).fromNow()
        descovery[index].ip = GeoIP.lookup(descovery[index].ip)
        descovery[index]['work'] = JSON.parse(descovery[index]['work'])
        if (descovery[index]['work'] && descovery[index]['work']['value']) {
          descovery[index]['work']['text'] = await zpData.data(descovery[index]['work']['value'][0], descovery[index]['work']['value'][1])
        }

        if (descovery[index].type == 'answer') {
          const questions = await Database.from('questions').select('title').where('id', descovery[index].relation_id).first() || {}
          descovery[index].title = questions.title
        }
      }

      // let descovery = []
      // for (let index = 0; index < 10; index++) {
      //   // moment
      //   if (data.moments.length && data.moments[index]) {
      //     const like = await Database.from('likes').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1, user_id: session.get('user_id') || '' }).first()
      //     descovery.push({
      //       id: data.moments[index].id,
      //       recommend: data.moments[index].recommend,
      //       user_id: data.moments[index].user_id,
      //       nickname: data.moments[index].nickname,
      //       avatar_url: data.moments[index].avatar_url,
      //       sex: data.moments[index].sex,
      //       title: '',
      //       content: data.moments[index].content,
      //       photos: data.moments[index].photos ? JSON.parse(data.moments[index].photos) : [],
      //       age: Moment().diff(data.moments[index].birthday, 'years'),
      //       data_type: 'moment',
      //       like: like && like.id ? true : false,
      //       likeNum: (await Database.from('likes').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
      //       commentNum: (await Database.from('comments').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
      //       ip: GeoIP.lookup(data.moments[index].ip),
      //       created_at: Moment(data.moments[index].created_at).format('YYYY-MM-DD')
      //     })
      //   }
      //
      //   // answer
      //   if (data.answer.length && data.answer[index]) {
      //     const like = await Database.from('likes').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1, user_id: session.get('user_id') || '' }).first()
      //     const question = await Database.from('questions').select('title').where('id', data.answer[index].relation_question_id).first() || {}
      //     descovery.push({
      //       id: data.answer[index].id,
      //       recommend: data.answer[index].recommend,
      //       user_id: data.answer[index].user_id,
      //       nickname: data.answer[index].nickname,
      //       avatar_url: data.answer[index].avatar_url,
      //       sex: data.answer[index].sex,,
      //       title: question.title || '',
      //       content: data.answer[index].content,
      //       photos: data.answer[index].photos ? JSON.parse(data.answer[index].photos) : [],
      //       age: Moment().diff(data.answer[index].birthday, 'years'),
      //       data_type: 'answer',
      //       like: like && like.id ? true : false,
      //       likeNum: (await Database.from('likes').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
      //       commentNum: (await Database.from('comments').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
      //       ip: GeoIP.lookup(data.answer[index].ip),
      //       created_at: Moment(data.answer[index].created_at).format('YYYY-MM-DD')
      //     })
      //   }
      // }

      return view.render('admin/event/descovery', {
        data: {
          title: '论坛',
          subtitle,
          active: 'descovery',
          descovery,
          all
        }
      })
    } catch (error) {
      console.log(error);

    }
  }
}
