import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';
const zpData = require('../lib/Zhipin');
const Data = require('../lib/Data');

export default class EventController {
  public async descovery({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      let descovery = (await Database.rawQuery(`
        SELECT am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, am.title, am.content, am.photos, am.relation_id, am.created_at FROM (
        	SELECT 'answer' AS type, id, user_id, '' as title, content, photos, relation_question_id as relation_id, created_at FROM answer WHERE status = 1 AND type = 0
        	UNION
        	SELECT 'moment' AS type, id, user_id, '' as title, content, photos, '' as relation_id, created_at FROM moments WHERE status = 1
        ) AS am
        JOIN users ON am.user_id = users.user_id ORDER BY am.created_at DESC LIMIT 12 OFFSET ${ request.input('page', 1) }
      `))[0]

      for (let index = 0; index < descovery.length; index++) {
        descovery[index].photos = JSON.parse(descovery[index].photos)
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

        const like = await Database.from('likes').where({ relation_type_id: descovery[index].id, type: descovery[index].type, status: 1, user_id: session.get('user_id') || '' }).first()
        descovery[index].like = like && like.id ? true : false
        descovery[index].likeNum = (await Database.from('likes').where({ relation_type_id: descovery[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0
        descovery[index].commentNum = (await Database.from('comments').where({ relation_type_id: descovery[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0

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
      Logger.error("error 获取失败 %s", JSON.stringify(error));
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
          // moment.created_at = Moment(moment.created_at).format('YYYY-MM-DD HH:mm:ss')
          // moment.modified_at = Moment(moment.modified_at).format('YYYY-MM-DD HH:mm:ss')
          moment.created_at = Moment(moment.created_at).fromNow()
          moment.modified_at = Moment(moment.modified_at).fromNow()

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
          answer.created_at = Moment(answer.created_at).fromNow()
          answer.modified_at = Moment(answer.modified_at).fromNow()
          // answer.created_at = Moment(answer.created_at).format('YYYY-MM-DD HH:mm:ss')
          // answer.modified_at = Moment(answer.modified_at).format('YYYY-MM-DD HH:mm:ss')

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

  public async datas({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').where({ id: all.field_value, status: 1 }).first() || {}
      if (customer.id) {
        return await Data.record({ table: 'customer', field: 'id', field_value: all.field_value, user_id: session.get('user_id'), wechat_open_id: all.wechat_open_id, category: all.category, count: all.count || 1 })
      } else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async like({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (request.method() == 'GET') {
        let customer = []
        switch (params.type) {
          case 'customer':
            customer = await Database.from('likes').select('customer.id as cid', 'relation_log_id', 'likes.created_at').where({ 'likes.type': 'customer', 'likes.user_id': session.get('user_id') }).join('customer', 'likes.relation_type_id', '=', 'customer.id').where({ 'likes.status': 1, 'customer.status': 1 }).orderBy('likes.created_at', 'desc')
            for (let index = 0; index < customer.length; index++) {
              customer[index].created_at = Moment(customer[index].created_at).format('YYYY-MM-DD HH:mm')
              if (customer[index].relation_user_id) {
                const user = await Database.from('users').select('avatar_url', 'nickname', 'birthday', 'work').where('user_id', customer[index].relation_user_id).first()
                user.age = Moment().diff(user.birthday, 'years')
                user.work = user.work ? JSON.parse(user.work) : []
                if (user.work.value) {
                  user.work.text = await zpData.data(user.work.value[0], user.work.value[1])
                }
                customer[index] = {
                  ...customer[index],
                  ...user
                }
              } else if (customer[index].relation_log_id) {
                const customer_log = await Database.from('customer_log').select('avatar_url', 'nickname', 'birthday', 'work').where('id', customer[index].relation_log_id).first()
                customer_log.age = Moment().diff(customer_log.birthday, 'years')
                customer_log.work = customer_log.work ? JSON.parse(customer_log.work) : []
                if (customer_log.work.value) {
                  customer_log.work.text = await zpData.data(customer_log.work.value[0], customer_log.work.value[1])
                }
                customer[index] = {
                  ...customer[index],
                  ...customer_log
                }
              }
            }
            break;
        }

        return response.json({ status: 200, message: "ok", data: customer })
      }

      if (request.method() == 'POST' && (params.type == 'moment' || params.type == 'answer' || params.type == 'customer')) {
        // 如果已存在 like 数据则更新，否则插入
        let data = {}
        const like = await Database.from('likes').where({ relation_type_id: params.id, type: params.type, user_id: session.get('user_id') }).first()
        if (like && like.id) {
          data = await Database.from('likes').where({ relation_type_id: params.id }).update({ status: like.status ? 0 : 1, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() })
        } else {
          data = await Database.table('likes').insert({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id'), ip: request.ip() })
        }

        const dataLike = await Database.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, user_id: session.get('user_id') }).first()
        data = {
          ...data,
          like: dataLike && dataLike.id ? true : false,
          likeNum: (await Database.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
          commentNum: (await Database.from('comments').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
        }

        return response.json({ status: 200, message: "ok", data })
      }
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
