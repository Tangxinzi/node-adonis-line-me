import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class EventController {
  public async descovery({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const moments = await Database.from('moments').select('moments.id', 'moments.relation_user_id', 'moments.content', 'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'moments.relation_user_id', '=', 'users.wechat_open_id').limit(10).orderBy('moments.created_at', 'desc')
      const answer = await Database.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.relation_user_id', 'answer.content', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.relation_user_id', '=', 'users.wechat_open_id').limit(10).orderBy('answer.created_at', 'desc')

      let descovery = []
      // descovery.push({
      //   id: 0,
      //   relation_user_id: 'op02s4vhiiLffHPfdB7LKmpMdr_I',
      //   nickname: 'Jiang',
      //   avatar_url: '/uploads/files/c9WyMZmT3nl6QKrXhNivsFAvMcv7MPBd.png',
      //   sex: '',
      //   content: '我想向大家介绍一位非常出色的朋友，她叫小美。她今年 28 岁，是一名资深的市场营销专家，工作十分努力和聪明。小美是一个热情开朗、乐观向上的人，善于与人交往，总是能在困难时找到解决问题的方法。她热爱运动，经常参加慈善马拉松，并且对健康饮食有着很好的认识。此外，她还是一个优秀的画家，每幅画作都充满了她对生活的热爱和感悟。',
      //   photos: ['/uploads/files/rMp4Y9km65FkpIC3XOYpQovkcyieSqUo.jpg'],
      //   age: 0,
      //   data_type: 'introduce',
      //   ip: '',
      //   created_at: Moment().fromNow()
      // })

      for (let index = 0; index < 10; index++) {
        // moment
        if (moments[index]) {
          const like = await Database.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1, relation_user_id: all.openid || '' }).first()
          descovery.push({
            id: moments[index].id,
            relation_user_id: moments[index].relation_user_id,
            nickname: moments[index].nickname,
            avatar_url: moments[index].avatar_url,
            sex: moments[index].sex,
            content: moments[index].content,
            photos: moments[index].photos ? JSON.parse(moments[index].photos) : [],
            age: Moment().diff(moments[index].birthday, 'years'),
            data_type: 'moment',
            like: like && like.id ? true : false,
            likeNum: (await Database.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
            commentNum: (await Database.from('comments').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
            ip: moments[index].ip,
            created_at: Moment(moments[index].created_at).fromNow()
          })
        }

        // answer
        if (answer[index]) {
          const like = await Database.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1, relation_user_id: all.openid || '' }).first()
          descovery.push({
            id: answer[index].id,
            relation_user_id: answer[index].relation_user_id,
            nickname: answer[index].nickname,
            avatar_url: answer[index].avatar_url,
            sex: answer[index].sex,
            content: answer[index].content,
            photos: answer[index].photos ? JSON.parse(moments[index].photos) : [],
            age: Moment().diff(answer[index].birthday, 'years'),
            data_type: 'answer',
            like: like && like.id ? true : false,
            likeNum: (await Database.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
            commentNum: (await Database.from('comments').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
            ip: answer[index].ip,
            created_at: Moment(answer[index].created_at).fromNow(),
            ...await Database.from('questions').select('title').where('id', answer[index].relation_question_id).first()
          })
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: descovery
      })
    } catch (error) {
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async type({ params, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const like = await Database.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, relation_user_id: all.openid || '' }).first()

      switch (params.type) {
        case 'moment':
          const moment = await Database.from('moments').where('id', params.id).first()

          moment.like = like && like.id ? true : false
          moment.likeNum =(await Database.from('likes').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0
          moment.commentNum = (await Database.from('comments').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0

          moment.photos = moment.photos ? JSON.parse(moment.photos) : []
          moment.comments = await Database.from('comments').where({ type: 'moment' })
          moment.created_at = Moment(moment.created_at).format('YYYY-MM-DD HH:mm:ss')
          moment.modified_at = Moment(moment.modified_at).format('YYYY-MM-DD HH:mm:ss')
          return response.json({ status: 200, message: "ok", data: moment })
          break;

        case 'answer'
          var question = await Database.from('answer').where({id: params.id, relation_user_id: all.openid}).first()

          question.like = like && like.id ? true : false
          question.likeNum =(await Database.from('likes').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0
          question.commentNum = (await Database.from('comments').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0

          question.userinfo = await Database.from('users').where({wechat_open_id: all.openid}).first()
          question.comments = await Database.from('comments').where({ type: 'answer' })
          question.created_at = Moment(question.created_at).format('YYYY-MM-DD HH:mm:ss')
          question.modified_at = Moment(question.modified_at).format('YYYY-MM-DD HH:mm:ss')
          question = {
            ...question,
            ...await Database.from('questions').select('title').where('id', question.relation_question_id).first()
          }
          question.photos = JSON.parse(question.photos || '[]')
          return response.json({ status: 200, message: "ok", data: question })
          break;
      }

    } catch (error) {
      console.log(error);
    }
  }

  public async like({ params, request, response }: HttpContextContract) {
    try {
      // 如果已存在 like 数据则更新，否则插入
      let data = {}
      const all = request.all()
      const like = await Database.from('likes').where({ relation_type_id: params.id, type: all.type, relation_user_id: all.openid }).first()
      if (like && like.id) {
        data = await Database.from('likes').where({ relation_type_id: params.id }).update({ status: like.status ? 0 : 1, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() })
      } else {
        data = await Database.table('likes').insert({ type: all.type, relation_type_id: params.id, relation_user_id: all.openid, ip: request.ip() })
      }

      const dataLike = await Database.from('likes').where({ relation_type_id: params.id, type: all.type, status: 1, relation_user_id: all.openid }).first()
      data = {
        ...data,
        like: dataLike && dataLike.id ? true : false,
        likeNum: (await Database.from('likes').where({ relation_type_id: params.id, type: all.type, status: 1 }).count('* as total'))[0].total || 0,
        commentNum: (await Database.from('comments').where({ relation_type_id: params.id, type: all.type, status: 1 }).count('* as total'))[0].total || 0,
      }

      response.json({ status: 200, message: "ok", data })
    } catch (error) {
      console.log(error)
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
