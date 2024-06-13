import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment';

const RELATION = ["朋友", "亲戚", "伙伴", "同事", "其他"]
const { percentUserinfo } = require('../lib/Percent');
const Verification = require('../lib/Verification');

export default class AdminController {
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
        verification.verification_user = await Database.from('users').select('user_id', 'nickname', 'avatar_url', 'type').where({ user_id: verification.verification_user_id || '' }).first() || {}
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
            // verification.table = '认证审核'
            verification.value = JSON.parse(verification.value)
            break;
        }

        const field = await Verification.field(`${ verification.table }.${ verification.field }`)
        verification.text = field[0] + field[1]

        return response.json({
          status: 200,
          message: "ok",
          data: {
            // watermark: this.watermark(session.get('user_id')),
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
      const all = request.all(), operates = await Database.from('users_operates').where({ user_id: session.get('user_id') }).where('type', 'like', '%examine%').first() ? true : false
      if (operates) {
        var verify = await Database.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20)
        for (let index = 0; index < verify.length; index++) {
          verify[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].user_id }).first()
          verify[index].checker = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].verification_user_id }).first() || {}
          verify[index].verification_status = verify[index].verification_status.toUpperCase()
          verify[index].created_at = Moment(verify[index].created_at).fromNow()
          verify[index].modified_at = verify[index].modified_at ? Moment(verify[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : ''

          const field = await Verification.field(`${ verify[index].table }.${ verify[index].field }`)
          switch (`${ verify[index].table }.${ verify[index].field }`) {
            // 介绍
            case 'customer.':
              verify[index].table = field[0]
              verify[index].value = JSON.parse(verify[index].value)
              break;
            
            // 用户
            case 'users.avatar_url':
            case 'users.photos':
            
              // 被介绍人信息 - 基础信息
            case 'customer_log.photos':

            // 被介绍人信息 - 认证
            case 'authentication_log.idcard':
            case 'authentication_log.school':
            case 'authentication_log.company':
            case 'authentication_log.work':
            case 'authentication_log.job_title':
            case 'authentication_log.salary':
              verify[index].table = field[0]
              verify[index].value = field[1]
              break;
          }
        }
      }

      return response.json({
        status: 200,
        message: "ok",
        data: {
          verify,
          operates,
          // watermark: this.watermark(session.get('user_id')),
          pending: (await Database.from('verification').where({ is_verified: 0, verification_status: 'pending' }).count('* as total'))[0].total
        }
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async customer({ request, response, session }: HttpContextContract) {
    try {
      let customer = (await Database.rawQuery(`
        SELECT
          customer.id as cid,
          customer.user_id,
          IFNULL(customer_log.sex, users.sex) AS sex,
        	IFNULL(customer_log.nickname, users.nickname) AS nickname,
        	IFNULL(customer_log.avatar_url, users.avatar_url) AS avatar_url,
        	IFNULL(customer_log.birthday, users.birthday) AS birthday,
        	IFNULL(customer_log.height, users.height) AS height,
        	IFNULL(customer_log.weight, users.weight) AS weight,
        	IFNULL(customer_log.work, users.work) AS work,
          users.job_title,
        	IFNULL(customer_log.photos, users.photos) AS photos,
        	IFNULL(customer_log.videos, users.videos) AS videos,
        	IFNULL(customer_log.detail, users.detail) AS detail,
        	IFNULL(customer_log.expectation, users.expectation) AS expectation,
        	IFNULL(customer_log.contact_wechat, users.contact_wechat) AS contact_wechat,
        	IFNULL(customer_log.company, users.company) AS company,
        	IFNULL(customer_log.school, users.school) AS school,
        	IFNULL(customer_log.location, users.location) AS location,
        	IFNULL(customer_log.salary, users.salary) AS salary,
          customer.relation,
          customer.introduction,
          customer.recommend,
          customer.status,
          customer.created_at
        FROM customer
        LEFT JOIN customer_log ON customer.relation_user_id IS NULL AND customer.relation_log_id = customer_log.id
        LEFT JOIN users ON customer.relation_user_id IS NOT NULL AND customer.relation_user_id = users.user_id
        WHERE customer.status IN (1, 2) AND customer.deleted_at IS NULL
        ORDER BY customer.created_at DESC
        LIMIT ${ request.input('page', 0) * 15 }, 15
      `))[0]

      for (let index = 0; index < customer.length; index++) {
        customer[index].relation = RELATION[customer[index].relation]
        customer[index].parent = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first() || {}
        customer[index].created_at = Moment(customer[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      return response.json({
        status: 200,
        message: "ok",
        data: customer
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async users({ request, response, session }: HttpContextContract) {
    try {
      const users = await Database.from('users').select('id', 'type', 'user_id', 'nickname', 'avatar_url', 'detail', 'created_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)

      for (let index = 0; index < users.length; index++) {
        users[index].created_at = Moment(users[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      return response.json({
        status: 200,
        message: "ok",
        data: users
      })
    } catch (error) {
      console.log(error);
    }
  }
}
