import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';
import zpData from '../lib/Zhipin';
import Data from '../lib/Data';

export default class EventController {
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
                const user = await Database.from('users').select('avatar_url', 'nickname', 'birthday', 'photos', 'work').where('user_id', customer[index].relation_user_id).first() || {}
                user.age = Moment().diff(user.birthday, 'years')
                user.work = user.work ? JSON.parse(user.work) : []
                user.photos = user.photos ? JSON.parse(user.photos) : []
                if (user.work.value) {
                  user.work.text = await zpData.data(user.work.value[0], user.work.value[1])
                }
                customer[index] = {
                  ...customer[index],
                  ...user
                }
              } else if (customer[index].relation_log_id) {
                const customer_log = await Database.from('customer_log').select('avatar_url', 'nickname', 'birthday', 'photos', 'work').where('id', customer[index].relation_log_id).first() || {}
                customer_log.age = Moment().diff(customer_log.birthday, 'years')
                customer_log.work = customer_log.work ? JSON.parse(customer_log.work) : []
                customer_log.photos = customer_log.photos ? JSON.parse(customer_log.photos) : []
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
