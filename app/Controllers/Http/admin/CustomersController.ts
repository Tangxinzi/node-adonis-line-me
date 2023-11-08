import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';
Moment.locale('zh-cn')

export default class CustomersController {
  public async field({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').where({ id: all.id }).first()

      switch (all.button) {
        case 'recommend':
          await Database.from('customer').where({ id: all.id }).update({ recommend: !customer.recommend })
          break;
        case 'delete':
          await Database.from('customer').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD hh:mm:ss') })
          break;
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }

  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id', 'user_id', 'introduction', 'relation', 'relation_log_id', 'relation_user_id', 'recommend').where('status', 1).orderBy('recommend', 'desc').orderBy('created_at', 'desc').limit(20)
      for (let index = 0; index < customer.length; index++) {
        // 红娘自行发布
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'work', 'created_at', 'modified_at').where('id', customer[index].relation_log_id).first(),
            parent: await Database.from('users').select('nickname', 'avatar_url').where('user_id', customer[index].user_id).first()
          }
        }

        // 关联注册用户 openid
        if (customer[index].relation_user_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'work', 'created_at', 'modified_at').where('user_id', customer[index].relation_user_id).first(),
            parent: await Database.from('users').select('nickname', 'avatar_url').where('user_id', customer[index].relation_user_id).first()
          }
        }

        // 格式数据
        customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : []
        customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : []
        customer[index]['age'] = Moment().diff(customer[index]['birthday'], 'years')
        customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : []
        customer[index].created_at = Moment(customer[index].created_at).fromNow()
        customer[index].modified_at = Moment(customer[index].modified_at).fromNow()

        let relation = ["朋友", "亲戚", "伙伴", "同事", "其他"]
        customer[index].relation = relation[customer[index].relation]

        // IP 属地
        if (customer[index].ip) {
          await axios({
            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ customer[index].ip }&json=true`,
            responseType: "arraybuffer"
          }).then((response) => {
            const data = iconv.decode(response.data, 'gbk')
            customer[index].ip = data ? JSON.parse(data) : ''
          }).catch((error) => {
            // console.log(error)
          })
        }
      }

      return view.render('admin.customer.index', {
        data: {
          title: '介绍',
          active: 'customers',
          customer
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
