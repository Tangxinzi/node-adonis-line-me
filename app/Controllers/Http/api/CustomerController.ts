import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

// const { jscode2session } = require('../lib/Weixin');

export default class CustomerController {
  public async updateCustomerinfo({ request }: HttpContextContract) {
    try {
      const all = request.all()
      return await Database.table('customer').returning('id').insert({
        user_wechat_open_id: all.openid,
        relation: all.relation,
        relation_id: all.relation_id || '',
        introduction: all.introduction,
        // modified_at: ''
      })
    } catch (error) {
      console.log(error)
    }
  }
}
