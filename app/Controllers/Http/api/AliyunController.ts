import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import RandomString from 'randomstring';
import SMSClient from '@alicloud/sms-sdk';
import Moment from'moment';
const Env = require('@ioc:Adonis/Core/Env');

export default class AliyunController {
  public async SendSms({ response, request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const client = new SMSClient({
        accessKeyId: Env.get('accessKeyId'),
        secretAccessKey: Env.get('secretAccessKey'),
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
      });

      const code = RandomString.generate({ length: 4, charset: ['numeric'] })

      const params = {
        "RegionId": "default",
        "PhoneNumbers": all.PhoneNumbers || '',
        "SignName": "江南商城",
        "TemplateCode": "SMS_275205487",
        "TemplateParam": JSON.stringify({
          "code": code
        })
      };

      let sms = await Database.from('sms').where({ phone: all.PhoneNumbers, user_id: session.get('user_id') }).orderBy('created_at', 'desc').first()
      if (sms) {
        const seconds = Moment().diff(sms.created_at, 'seconds')
        if (seconds < 300) {
          response.json({ status: 200, message: "timeout", data: '当前验证码已失效' })
        }
      }

      client.sendSMS(params).then(async (result) => {
        console.log(result);
        await Database.table('sms').insert({ user_id: session.get('user_id'), phone: all.PhoneNumbers, code, result: JSON.stringify(result), ip: request.ip() })
        return { errno: 1, message: result }
      }, async (ex) => {
        console.error(ex);
        await Database.table('sms').insert({ user_id: session.get('user_id'), phone: all.PhoneNumbers, code, result: JSON.stringify(ex), ip: request.ip() })
        return { errno: 0, message: ex }
      });
    } catch (e) {
      console.log(e);
      return { errno: 0, message: e }
    }
  }
}
