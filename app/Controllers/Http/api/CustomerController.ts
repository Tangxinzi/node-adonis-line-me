import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// const { jscode2session } = require('../lib/Weixin');

export default class CustomerController {
  public async updateCustomerinfo({ request, response }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('customer').returning('id').insert({
        user_wechat_open_id: all.openid,
        relation: all.relation || '',
        relation_id: all.relation_id || '',
        introduction: all.introduction,
        userinfo: JSON.stringify(all.userinfo)
        // modified_at: ''
      })

      response.json({ status: 200, message: "ok" })
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
