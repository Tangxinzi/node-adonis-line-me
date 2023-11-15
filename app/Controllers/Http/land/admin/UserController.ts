import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
const { jscode2session, getuserphonenumber } = require('./Weixin');

export default class UserController {
  public async wxLogin({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await jscode2session(all.code)
      const user = await Database.from('land_users').where('wechat_open_id', result.openid).first()
      if (user) {
        return user
      } else {
        const id = await Database.table('land_users').insert({ wechat_open_id: result.openid }).returning('id')
        return await Database.from('land_users').where('id', id[0]).first()
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async userinfo({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (request.method() == 'GET') {
        const user = await Database.from('land_users').where('wechat_open_id', all.openid).first()
        user.collection_num = (await Database.from('land_collection').where({ wechat_open_id: all.openid, status: 1 }).count('* as total'))[0].total || 0
        return user
      } else {
        const result = await jscode2session(all.code)
        await Database.from('land_users').where('wechat_open_id', result.openid).update({ nickname: all.nickname, avatar_url: all.avatar_url })
        return await Database.from('land_users').where('wechat_open_id', result.openid).first()
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async collection({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (all.type == 'designer') {
        const data = await Database.from('land_collection').where({ type: all.type, wechat_open_id: all.openid, status: 1 })
        for (let index = 0; index < data.length; index++) {
          data[index].content = await Database.from('land_designers').where('id', data[index].relation_type_id).first()
          data[index].content.labels = data[index].content.labels ? data[index].content.labels.split(',') : []
        }
        return response.json({ status: 200, message: "ok", data })
      }
      if (all.type == 'work') {
        const data = await Database.from('land_collection').where({ type: all.type, wechat_open_id: all.openid, status: 1 })
        for (let index = 0; index < data.length; index++) {
          data[index].content = await Database.from('land_works').where('id', data[index].relation_type_id).first()
          data[index].content.labels = data[index].content.labels ? data[index].content.labels.split(',') : []
        }
        return response.json({ status: 200, message: "ok", data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async getPhoneNumber({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await jscode2session(all.code)
      console.log(result);

    } catch (error) {
      console.log(error)
    }
  }

  public async like({ params, request, response, session }: HttpContextContract) {
    try {
      // 如果已存在 like 数据则更新，否则插入
      let data = {}
      const all = request.all()
      const coll = await Database.from('land_collection').where({ wechat_open_id: all.openid, relation_type_id: params.id, type: all.type }).first()

      if (request.method() == 'GET') {
        return response.json({ status: 200, message: "ok", data: coll })
      }

      if (coll && coll.id) {
        data = await Database.from('land_collection').where({ relation_type_id: params.id }).update({ status: coll.status ? 0 : 1, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      } else {
        data = await Database.table('land_collection').insert({ type: all.type, relation_type_id: params.id, wechat_open_id: all.openid })
      }

      const dataColl = await Database.from('land_collection').where({ relation_type_id: params.id, type: all.type, status: 1, wechat_open_id: all.openid }).first()
      data = {
        ...data,
        like: dataColl && dataColl.id ? true : false
      }

      response.json({ status: 200, message: "ok", data })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
