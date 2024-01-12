import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')
import axios from "axios"
import zpData from '../lib/Zhipin'

export default class DescoveriesController {
  public async index({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), descovery = (await Database.rawQuery(`
        SELECT am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'answer' AS type, id, user_id, '' AS title, content, photos, relation_question_id AS relation_id, created_at
            FROM answer
            WHERE status = 1 AND type = 0
            UNION
            SELECT 'moment' AS type, id, user_id, '' AS title, content, photos, '' AS relation_id, created_at
            FROM moments
            WHERE status = 1
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at
        ORDER BY am.created_at DESC
        LIMIT ${ request.input('page', 0) * 10 }, 10
      `))[0]

      for (let index = 0; index < descovery.length; index++) {
        descovery[index].photos = JSON.parse(descovery[index].photos)
        descovery[index].location = descovery[index].location ? JSON.parse(descovery[index].location) : {}
        descovery[index].age = Moment().diff(descovery[index].birthday, 'years')
        descovery[index].created_at = Moment(descovery[index].created_at).fromNow()
        descovery[index]['work'] = JSON.parse(descovery[index]['work'])
        if (descovery[index]['work'] && descovery[index]['work']['value']) {
          descovery[index]['work']['text'] = await zpData.data(descovery[index]['work']['value'][0], descovery[index]['work']['value'][1])
        }

        if (descovery[index].type == 'answer') {
          const questions = await Database.from('questions').select('title').where('id', descovery[index].relation_id).first() || {}
          descovery[index].title = questions.title
        }

        const like = await Database.from('likes').where({ relation_type_id: descovery[index].id, type: descovery[index].type, status: 1, user_id: session.get('user_id') || '' }).first() || {}
        descovery[index].like = like && like.id ? true : false

        // IP
        // if (descovery[index].ip) {
        //   await axios({
        //     url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ descovery[index].ip }&json=true`,
        //     responseType: "arraybuffer"
        //   }).then(function (response) {
        //     const data = iconv.decode(response.data, 'gbk')
        //     descovery[index].ip = data ? JSON.parse(data) : ''
        //   }).catch(function (error) {
        //     // console.log(error)
        //   })
        // }
      }

      response.json({
        status: 200,
        message: "ok",
        data: descovery
      })
    } catch (error) {
      console.log(error);

      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async type({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = this.getUserinfo(session.get('user_id'))
      const like = await Database.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, user_id: session.get('user_id') || '' }).first() || {}

      switch (params.type) {
        case 'moment':
          let moment = await Database.from('moments').where('id', params.id).first() || {}

          moment.data_type = 'moment'

          moment.like = like && like.id ? true : false
          moment.likeNum =(await Database.from('likes').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0
          moment.commentNum = (await Database.from('comments').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0

          moment.userinfo = await Database.from('users').where({user_id: moment.user_id}).first()
          moment.photos = moment.photos ? JSON.parse(moment.photos) : []
          moment.comments = await this.getComments('moment', moment.id)
          moment.created_at = Moment(moment.created_at).format('YYYY-MM-DD HH:mm:ss')
          moment.modified_at = Moment(moment.modified_at).format('YYYY-MM-DD HH:mm:ss')
          // moment.created_at = Moment(moment.created_at).fromNow()
          // moment.modified_at = Moment(moment.modified_at).fromNow()

          moment.title = '发布了动态'

          return response.json({ status: 200, message: "ok", data: moment })
          break;

        case 'answer'
          let answer = await Database.from('answer').where('id', params.id).first() || {}

          answer.data_type = 'answer'

          answer.like = like && like.id ? true : false
          answer.likeNum =(await Database.from('likes').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0
          answer.commentNum = (await Database.from('comments').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0

          answer.userinfo = await Database.from('users').where({user_id: answer.user_id}).first()
          answer.photos = answer.photos ? JSON.parse(answer.photos) : []
          answer.comments = await this.getComments('answer', answer.id)
          answer.created_at = Moment(answer.created_at).format('YYYY-MM-DD HH:mm:ss')
          answer.modified_at = Moment(answer.modified_at).format('YYYY-MM-DD HH:mm:ss')
          // answer.created_at = Moment(answer.created_at).fromNow()
          // answer.modified_at = Moment(answer.modified_at).fromNow()

          const question = await Database.from('questions').select('title').where('id', answer.relation_question_id).first()
          answer.title = question.title

          return response.json({ status: 200, message: "ok", data: answer })
          break;
      }
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  async getUserinfo(user_id) {
    try {
      return await Database.from('users').select('nickname', 'avatar_url').where({ user_id }).first()
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  async getComments(type, relation_type_id) {
    try {
      const comments = await Database.from('comments').where({ type, relation_type_id, status: 1 }), dataset = []
      for (let index = 0; index < comments.length; index++) {
        const userinfo = await this.getUserinfo(comments[index].user_id)
        dataset[index] = {
          user_id: comments[index].user_id,
          nickname: userinfo.nickname,
          avatar_url: userinfo.avatar_url,
          comment_content: comments[index].comment_content,
          created_at: Moment(comments[index].created_at).format('YYYY-MM-DD HH:mm:ss'),
        }

        if (comments[index].ip) {
          await axios({
            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ comments[index].ip }&json=true`,
            responseType: "arraybuffer"
          }).then(function (response) {
            const data = iconv.decode(response.data, 'gbk')
            dataset[index].ip = data ? JSON.parse(data) : ''
          }).catch(function (error) {
            // console.log(error)
          })
        }
      }
      return dataset
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async personal({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      switch (params.type) {
        case 'likes':
          let likes = (await Database.rawQuery(`
            SELECT likes.user_id, likes.type, likes.relation_type_id,
              CASE
                WHEN likes.type = 'answer' THEN answer.content
                WHEN likes.type = 'moment' THEN moments.content
                ELSE 'Unknown Type'
              END AS related_content
            FROM likes
            LEFT JOIN answer ON likes.relation_type_id = answer.id AND likes.type = 'answer'
            LEFT JOIN moments ON likes.relation_type_id = moments.id AND likes.type = 'moment'
            WHERE likes.user_id = '${ session.get('user_id') }' AND likes.status = 1 AND likes.type in ('answer', 'moment')
            ORDER BY likes.created_at DESC;
          `))[0]

          return response.json({ status: 200, message: "ok", data: likes })
          break;

        case 'comments':
          let comments = (await Database.rawQuery(`
            SELECT comments.user_id, comments.type, comments.relation_type_id, comments.comment_content comment,
              CASE
                WHEN comments.type = 'answer' THEN answer.content
                WHEN comments.type = 'moment' THEN moments.content
                ELSE 'Unknown Type'
              END AS related_content,
              users.nickname,
              users.avatar_url
            FROM comments
            LEFT JOIN answer ON comments.relation_type_id = answer.id AND comments.type = 'answer'
            LEFT JOIN moments ON comments.relation_type_id = moments.id AND comments.type = 'moment'
            LEFT JOIN users ON users.user_id = COALESCE(answer.user_id, moments.user_id)
            WHERE comments.user_id = '${ session.get('user_id') }' AND comments.status = 1 AND comments.type in ('answer', 'moment')
            ORDER BY comments.created_at DESC;
          `))[0]

          return response.json({ status: 200, message: "ok", data: comments })
          break;

        default:
          return response.json({ status: 200, message: "ok", data: [] })
      }

    } catch (error) {
      console.log(error);
    }
  }
}
