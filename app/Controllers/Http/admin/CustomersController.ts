import Database from '@ioc:Adonis/Lucid/Database';
import Moment from'moment';

export default class CustomersController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id', 'user_wechat_open_id', 'introduction', 'relation', 'relation_log_id', 'relation_wechat_open_id').where('status', 1).orderBy('created_at', 'desc').limit(20)
      for (let index = 0; index < customer.length; index++) {
        // 红娘自行发布
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('*').where('id', customer[index].relation_log_id).first()
          }
        }

        // 关联注册用户 openid
        if (customer[index].relation_wechat_open_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('*').where('wechat_open_id', customer[index].relation_wechat_open_id).first()
          }
        }

        // 格式数据
        customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : []
        customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : []
        customer[index]['age'] = Moment().diff(customer[index]['birthday'], 'years')
        customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : []
        customer[index].parent = await Database.from('users').select('nickname', 'avatar_url').where('wechat_open_id', customer[index].user_wechat_open_id).first()
        let relation = ["朋友", "亲戚", "伙伴", "同事", "其他"]
        customer[index].relation = relation[customer[index].relation]
        customer[index]['created_at'] = Moment(customer[index]['created_at']).format('YYYY-MM-DD hh:mm:ss')
      }

      // return customer

      return view.render('admin.customer.index', {
        data: {
          title: '推介',
          active: 'customers',
          customer
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
