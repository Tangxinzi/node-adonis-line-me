import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';
Moment.locale('zh-cn')
const zpData = require('../lib/Zhipin');
const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const RELATION = ["朋友", "亲戚", "伙伴", "同事", "其他"]

export default class CustomersController {
  public async field({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').where({ id: all.id }).orderBy('id', 'desc').first()

      switch (all.button) {
        case 're-recommend':
          await Database.from('customer').where({ id: all.id }).update({ recommend_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
          break;
        case 'recommend':
          await Database.from('customer').where({ id: all.id }).update({ recommend: !customer.recommend, recommend_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
          break;
        case 'delete':
          await Database.from('customer').where({ id: all.id }).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
          break;
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }

  public async index({ request, view, session }: HttpContextContract) {
    try {
      let all = request.all(), status = [1, 2]
      if (all.status == 1) {
        status = [1]
        all.orderBy = 'status_1'
      } else if (all.status == 2) {
        status = [2]
        all.orderBy = 'status_2'
      } else {
        status = [1, 2]
        all.orderBy = ''
      }
      
      const customer = await Database.from('customer').select('id', 'user_id', 'introduction', 'relation', 'relation_log_id', 'relation_user_id', 'recommend', 'status').whereIn('status', status).orderBy('id', 'desc').forPage(request.input('page', 1), 30)
      for (let index = 0; index < customer.length; index++) {
        // 红娘自行发布
        if (customer[index].relation_log_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('customer_log').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'school', 'company', 'work', 'phone', 'created_at', 'modified_at').where('id', customer[index].relation_log_id).first(),
            percent: await percentCustomerinfo(customer[index].relation_log_id),
            parent: await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first() || {}
          }
        }

        // 关联注册用户 openid
        if (customer[index].relation_user_id) {
          customer[index] = {
            ...customer[index],
            ...await Database.from('users').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'school', 'company', 'work', 'phone', 'created_at', 'modified_at').where('user_id', customer[index].relation_user_id).first(),
            percent: await percentUserinfo(customer[index].relation_user_id),
            parent: await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].relation_user_id).first() || {}
          }
        }

        // 格式数据
        customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : []
        customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : []
        customer[index]['age'] = Moment().diff(customer[index]['birthday'], 'years')
        customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : []
        customer[index].recommend_at = Moment(customer[index].recommend_at).format('YYYY-MM-DD HH:mm:ss')
        customer[index].created_at = Moment(customer[index].created_at).format('YYYY-MM-DD HH:mm:ss')
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

      const users_recommend = await Database.from('users_recommend').where('status', 0).orderBy('id', 'asc')
      for (let index = 0; index < users_recommend.length; index++) {
        users_recommend[index].user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', users_recommend[index].user_id).first() || {}
        users_recommend[index].created_at = Moment(users_recommend[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }      

      return view.render('admin/customer/index', {
        data: {
          title: '介绍',
          active: 'customers',
          customer,
          users_recommend,
          all
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async edit({ params, request, response, session, view }: HttpContextContract) {
    try {
      const all = request.all()
      const customer = await Database.from('customer').select('id as cid', 'status', 'user_id', 'relation_user_id', 'relation', 'relation_log_id', 'introduction', 'recommend', 'created_at').where({ 'id': params.id }).first() || {}
      if (customer.relation_log_id) {
        customer.relation_text = RELATION[customer.relation]
        customer.userinfo = await Database.from('customer_log').select('*').where({ 'id': customer.relation_log_id }).first()
        if (request.method() == 'POST') {
          await Database.from('customer').where({ id: customer.cid }).update({ introduction: all.introduction })
          await Database.from('customer_log').where({ id: customer.userinfo.id }).update({ expectation: all.userinfo.expectation || '', photos: JSON.stringify(all.userinfo.photos || []) })
          session.flash('message', { type: 'success', header: '更新成功', message: `` })
          return response.redirect('back')
        }
      } else if(customer.relation_user_id) {
        customer.userinfo = await Database.from('users').select('*').where({ 'user_id': customer.relation_user_id }).first()
      }

      customer.parent = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer.user_id).first() || {}
      customer.userinfo.photos = customer.userinfo.photos ? JSON.parse(customer.userinfo.photos) : []
      customer.userinfo.work = customer.userinfo.work ? JSON.parse(customer.userinfo.work) : []
      if (customer.userinfo.work.value) {
        customer.userinfo.work.text = await zpData.data(customer.userinfo.work.value[0], customer.userinfo.work.value[1])
      }
      customer.created_at = Moment(customer.created_at).format('YYYY-MM-DD HH:mm:ss')

      return view.render('admin/customer/edit', {
        data: {
          title: '介绍',
          active: 'customers',
          customer
        }
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }
}
