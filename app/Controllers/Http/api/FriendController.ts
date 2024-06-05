import Database from '@ioc:Adonis/Lucid/Database'
import Moment from 'moment';
import Jwt from 'App/Models/Jwt';

export default class FriendController {
  public async verify({ response, request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const sms = await Database.from('sms').where({ phone: all.phone, code: all.code }).first() || {}
      if (sms.id) {
        if (!(Moment(sms.created_at).diff(Moment()) > 5 * 60 * 1000)) {
          return response.json({ status: 200, message: "error", data: '验证码已过期' })
        }

        const customer = await Database.from('customer').where({ id: all.id, verify_phone: all.phone }).whereIn('status', [1, 2]).first() || {}
        if (customer.id) {
          return response.json({ 
            status: 200, 
            message: "success", 
            data: await Jwt.signPrivateKey(all.phone)
          })
        } else {
          return response.json({ status: 200, message: "error", data: '未找到验证信息' })
        }
      } else {
        return response.json({ status: 200, message: "error", data: '验证码有误' })
      }
    } catch (error) {
      console.log(error);
      return response.json({ status: 200, message: "error" })      
    }
  }

  public async updateCustomerField({ params, request, response }: HttpContextContract) {
    try {
      const userSign = request.header('User-Sign')
      const verify_phone = Jwt.verifyPublicKey(userSign || '')

      const all = request.all()
      let customer = await Database.from('customer').where({ id: params.id, verify_phone }).first()
      
      switch (`${ all.type }.${ all.field }`) {
        case 'customer.relation':
          var result = await Database.from('customer').where({ id: params.id, verify_phone }).update({ relation: all.value.relation, relation_text: all.value.relation_text })
          break;
        case 'customer.introduction':
          var result = await Database.from('customer').where({ id: params.id, verify_phone }).update({ introduction: all.value })
          break;
        case 'userinfo.nickname':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ nickname: all.value })
          break;
        case 'userinfo.avatar_url':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ avatar_url: all.value })
          // 头像 - 加入审核列表
          // await Verification.regularData({
          //   user_id: session.get('user_id'),
          //   table: 'customer_log',
          //   field: 'avatar_url',
          //   before: customer.avatar_url,
          //   value: all.value,
          //   ip: request.ip()
          // })
          break;
        case 'userinfo.contact_wechat':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ contact_wechat: all.value.contact_wechat, contact_wechat_show: all.value.contact_wechat_show })
          break;
        case 'userinfo.photos':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ photos: JSON.stringify(all.value) })
          break;
        case 'userinfo.work':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ work: JSON.stringify(all.value), work_code: all.value ? all.value.code : '' })
          break;
        case 'userinfo.job_title':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ job_title: all.value })
          break;
        case 'userinfo.height':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ height: all.value })
          break;
        case 'userinfo.weight':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ weight: all.value })
          break;
        case 'userinfo.birthday':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ birthday: all.value })
          break;
        case 'userinfo.location':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ location: JSON.stringify(all.value) })
          break;
        case 'userinfo.school':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ school: all.value.school, education: all.value.education })
          break;
        case 'userinfo.company':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ company: all.value })
          break;
        case 'userinfo.salary':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ salary: all.value })
          break;
        case 'userinfo.sex':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ sex: all.value })
          break;
        case 'userinfo.mbti':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ mbti: all.value })
          break;
        case 'userinfo.expectation':
          var result = await Database.from('customer_log').where({ id: customer.relation_log_id }).update({ expectation: all.value })
          break;
      }

      response.json({
        status: 200,
        sms: "ok",
        data: result
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        sms: "error",
        data: ''
      })
    }
  }
}
