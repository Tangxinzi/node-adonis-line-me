import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';

const { percentUserinfo } = require('../lib/Percent');
const Verification = require('../lib/Verification');

export default class OperatesController {
  watermark(mart) {
    try {
      const { createCanvas, loadImage } = require('canvas');
      // const fs = require('fs');

      // 创建 Canvas
      const canvas = createCanvas(240, 100);
      const context = canvas.getContext('2d');

      // 设置背景颜色
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 设置文字样式
      context.fillStyle = '#000000';
      context.font = '14px Arial';

      // 在 Canvas 上绘制倾斜的文字
      const text = `${ mart } ${ Moment().format('YYYY-MM-DD HH:mm:ss') }`;
      context.save(); // 保存当前状态
      context.rotate(-18 * Math.PI / 180); // 旋转角度，这里是 -45 度
      context.fillText(text, -10, 85);
      context.restore(); // 恢复到之前保存的状态

      // 将 Canvas 转为 Base64
      const base64 = canvas.toDataURL('image/png')

      // 保存为 PNG 图片
      // const buffer = Buffer.from(base64, 'base64');
      // fs.writeFileSync('output.png', buffer);

      // console.log('Image generated successfully!');

      return base64
    } catch (error) {
      console.log(error);
    }
  }

  public async review({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), verification = await Database.from('verification').where({ id: params.id }).first() || {}
      if (request.method() == 'GET') {
        const user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', session.get('user_id')).first() || {}
        const review = await Database.from('users').select('user_id', 'nickname', 'avatar_url', 'type').where({ user_id: verification.user_id }).first() || {}
        verification.verification_status = verification.verification_status.toUpperCase()
        verification.created_at = Moment(verification.created_at).format('YYYY-MM-DD HH:mm:ss')
        verification.modified_at = verification.modified_at ? Moment(verification.modified_at).format('YYYY-MM-DD HH:mm:ss') : ''

        switch (`${ verification.table }.${ verification.field }`) {
          case 'users.avatar_url':
            break;
          case 'users.photos':
            verification.before = JSON.parse(verification.before)
            verification.value = JSON.parse(verification.value)
            break;
          case 'customer.':
            // verification.table = '介绍好友'
            verification.value = JSON.parse(verification.value)
            break;
          case 'authentication_log.idcard':
            verification.table = '认证审核'
            verification.value = JSON.parse(verification.value)
            break;
        }

        return response.json({
          status: 200,
          message: "ok",
          data: {
            watermark: this.watermark(session.get('user_id')),
            verification,
            review,
            user,
          }
        })
      }

      if (request.method() == 'POST') {
        const action = await Verification.action(verification, {
          id: params.id,
          verification_comment: all.verification_comment || '',
          verification_status: all.verification_status,
          verification_user_id: session.get('user_id')
        })

        if (action) {
          return response.json({
            status: 200,
            message: "ok",
            data: { type: 'success', title: '已操作' }
          })
        } else {
          return response.json({
            status: 200,
            message: "ok",
            data: { type: 'error', title: '提交失败', message: `请检查您的账号状态或联系管理员。` }
          })
        }
      }
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      return response.json({
        status: 500,
        message: "ok",
        data: { type: 'error', title: '提交失败', message: `请检查您的账号状态或联系管理员。` }
      })
    }
  }

  public async verification({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), operates = await Database.from('users_operates').where({ user_id: session.get('user_id'), type: 'examine' }).first() ? true : false
      if (operates) {
        var verify = await Database.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20)
        for (let index = 0; index < verify.length; index++) {
          verify[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].user_id }).first()
          verify[index].checker = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].verification_user_id }).first() || {}
          verify[index].verification_status = verify[index].verification_status.toUpperCase()
          verify[index].created_at = Moment(verify[index].created_at).fromNow()
          verify[index].modified_at = verify[index].modified_at ? Moment(verify[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : ''

          switch (`${ verify[index].table }.${ verify[index].field }`) {
            case 'users.avatar_url':
              verify[index].table = '用户信息'
              verify[index].value = '头像'
              break;
            case 'users.photos':
              verify[index].table = '用户信息'
              verify[index].value = '照片集'
              break;
            case 'customer.':
              verify[index].table = '介绍好友'
              verify[index].value = JSON.parse(verify[index].value)
              break;
            case 'authentication_log.idcard':
              verify[index].table = '认证审核'
              verify[index].value = '用户身份'
              break;
            case 'authentication_log.school':
              verify[index].table = '认证审核'
              verify[index].value = '学校'
              break;
            case 'authentication_log.company':
              verify[index].table = '认证审核'
              verify[index].value = '公司'
              break;
            case 'authentication_log.work':
              verify[index].table = '认证审核'
              verify[index].value = '职业'
              break;
            case 'authentication_log.job_title':
              verify[index].table = '认证审核'
              verify[index].value = '职位'
              break;
            case 'authentication_log.salary':
              verify[index].table = '认证审核'
              verify[index].value = '薪资'
              break;
          }
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data: {
          verify,
          operates,
          watermark: this.watermark(session.get('user_id')),
          pending: (await Database.from('verification').where({ is_verified: 0, verification_status: 'pending' }).count('* as total'))[0].total
        }
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async authenticationVerification({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all(), data = {}
      if (request.method() == 'POST') {
        const authentication = await Database.from('authentication').where({ user_id: session.get('user_id') }).first() || {}
        const authentication_log = await Database.from('authentication_log').where({ user_id: session.get('user_id') }).first() || {}
        if (!authentication.id && !authentication_log.id) {
          await Database.table('authentication').insert({ user_id: session.get('user_id') })

          switch (all.type) {
            case 'idcard':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), idcard: all.value })
              break;
            case 'school':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), school: all.value })
              break;
            case 'company':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), company: all.value })
              break;
            case 'work':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), work: all.value })
              break;
            case 'job_title':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), job_title: all.value })
              break;
            case 'salary':
              await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 })
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), salary: all.value })
              break;
          }
        }

        switch (all.type) {
          case 'idcard':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ idcard: all.value })
            break;
          case 'school':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ school: all.value })
            break;
          case 'company':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ company: all.value })
            break;
          case 'work':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ work: all.value })
            break;
          case 'job_title':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ job_title: all.value })
            break;
          case 'salary':
            await Database.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 })
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ salary: all.value })
            break;
        }

        // 加入审核
        await Verification.regularData({
          user_id: session.get('user_id'),
          table: 'authentication_log',
          field: all.type,
          before: '',
          value: all.value,
          ip: request.ip()
        })
      }

      if (request.method() == 'GET') {
        // 状态：0 - 审核中，1 - 已通过，默认未提交
        const authentication = await Database.from('authentication').where({ user_id: all.user_id || session.get('user_id') }).first() || {}
        data = {
          ...authentication
          // idcard: authentication.idcard == 1 ? 'approved' : (authentication_log.idcard ? 'pending' : ''),
          // school: authentication.school == 1 ? 'approved' : (authentication_log.school ? 'pending' : ''),
          // company: authentication.company == 1 ? 'approved' : (authentication_log.company ? 'pending' : ''),
          // work: authentication.work == 1 ? 'approved' : (authentication_log.work ? 'pending' : ''),
          // job_title: authentication.job_title == 1 ? 'approved' : (authentication_log.job_title ? 'pending' : ''),
          // salary: authentication.salary == 1 ? 'approved' : (authentication_log.salary ? 'pending' : ''),
        }
      }

      response.json({
        status: 200,
        message: "ok",
        data
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }
}
