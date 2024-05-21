import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Logger from '@ioc:Adonis/Core/Logger'
import Env from '@ioc:Adonis/Core/Env';
import axios from "axios";
import iconv from 'iconv-lite';
import Jwt from 'App/Models/Jwt';
import RandomString from "randomstring";
import { v4 as uuidv4 } from 'uuid';
import Moment from 'moment';
import * as Vibrant from 'node-vibrant'
import GeoIP from 'geoip-lite';
import QrCode from 'qrcode';

const zpData = require('../lib/Zhipin');
const Avatar = require('../lib/Avatar');
const { percentUserinfo } = require('../lib/Percent');
const { jscode2session } = require('../lib/Weixin');
const Verification = require('../lib/Verification');
const Messages = require('../lib/Messages');

export default class UserController {
  getZodiacSign(day, month) {
    const zodiacSigns = [
      '摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
      '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'
    ];

    const signDates = [
      { month: 1, day: 20 }, { month: 2, day: 19 }, { month: 3, day: 20 },
      { month: 4, day: 20 }, { month: 5, day: 21 }, { month: 6, day: 21 },
      { month: 7, day: 23 }, { month: 8, day: 23 }, { month: 9, day: 23 },
      { month: 10, day: 23 }, { month: 11, day: 22 }, { month: 12, day: 22 }
    ];

    let i = 0;
    while (i < signDates.length) {
      if (month < signDates[i].month || (month === signDates[i].month && day <= signDates[i].day)) {
        return zodiacSigns[i];
      }
      i++;
    }

    return zodiacSigns[0];
  }

  public async wxaLogin({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const result = await jscode2session(all.code)
      result.user = await Database.from('users').where('wechat_open_id', result.openid).first() || {}
      if (!result.user.id) {
        const user_id = 'pie_a' + RandomString.generate({ length: 8, charset: ['numeric'] })
        const id = await Database.table('users').returning('id').insert({ user_id, wechat_open_id: result.openid })
        result.user.id = id[0]
        await Messages.push({ user_id, content: '相亲交友找对象，熟人介绍更靠谱。欢迎使用体验，如您在体验中遇任何问题请与管理员联系。' }) // 推送注册成功消息
      }
      delete result.session_key // 删除 jscode2session session key
      result.user.percent = await percentUserinfo(result.user.user_id)
      result.user.sign = await Jwt.signPrivateKey(result.user.id)

      // 更新设备信息
      const system = JSON.parse(all.system)
      await Database.from('users').where({ user_id: result.user.user_id }).update({ brand: system.brand, platform: system.platform, system: JSON.stringify(system) })

      return result
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async phoneLogin({ request }: HttpContextContract) {
    try {
      const all = request.all()
      const result = {}
      result.user = await Database.from('users').where('phone', all.phone).first() || {}
      if (!result.user.id) {
        const user_id = 'pie_a' + RandomString.generate({ length: 8, charset: ['numeric'] })
        const id = await Database.table('users').returning('id').insert({ user_id wechat_open_id: result.openid })
        result.user.id = id[0]
        await Messages.push({ user_id, content: '相亲交友找对象，熟人介绍更靠谱。欢迎使用体验，如您在体验中遇任何问题请与管理员联系。' }) // 推送注册成功消息
      }
      result.user.percent = await percentUserinfo(result.user.user_id)
      result.user.sign = await Jwt.signPrivateKey(result.user.id)
      return result
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async getUserinfo({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user_id = all.user_id || session.get('user_id') || ''
      const user = await Database.from('users').select('id', 'type', 'user_id', 'nickname', 'avatar_url', 'birthday', 'height', 'weight', 'sex', 'photos', 'videos', 'detail', 'expectation', 'contact_wechat', 'school', 'education', 'company', 'work', 'job_title', 'mbti', 'location', 'realname', 'salary', 'phone', 'parent_id', 'ip').where({ user_id }).first() || {}

      if (user) {
        user.percent = await percentUserinfo(user_id)

        // 格式数据
        const _geoip = GeoIP.lookup(request.ip()) || {}
        await Database.from('users').where({ user_id }).update({ online_at: Moment().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip(), ip_city: _geoip.city })
        user.photos = user.photos ? JSON.parse(user.photos) : []
        user.location = user.location ? JSON.parse(user.location) : ''
        user.videos = user.videos ? JSON.parse(user.videos) : []
        user.zodiac_sign = this.getZodiacSign(Moment(user.birthday).format('DD'), Moment(user.birthday).format('MM'))
        user.age = Moment().diff(user.birthday, 'years')

        // 审核
        user.examine = await Database.from('users_operates').where({ user_id, status: 1 }).where('type', 'like', '%examine%').first() ? true : false
        if (user.examine) {
          user.verification_count = (await Database.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total
        } else {
          delete user.examine
        }

        // 激励
        user.inspire = await Database.from('users_operates').where({ user_id, status: 1 }).where('type', 'like', '%inspire%').first() ? true : false
        if (user.inspire) {
          user.verification_count = (await Database.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total
        } else {
          delete user.inspire
        }

        user.introduces = await Database.from('answer').select('introduce_name', 'content').where({ type: 1, status: 1, recommend: 1, user_id }).orderBy('created_at', 'desc')

        user.work = user.work ? JSON.parse(user.work) : {}
        if (user.work && user.work.value) {
          user.work.text = await zpData.data(user.work.value[0], user.work.value[1])
        }

        user['number'] = {
          message: 0,
          introduction: (await Database.from('answer').where({ type: 1, status: 1, user_id }).count('* as total'))[0].total,
          like: (await Database.from('likes').where({ type: 'customer', status: 1, user_id }).count('* as total'))[0].total,
          visitor: 0,
          moment: (await Database.from('moments').where({ user_id }).count('* as total'))[0].total,
          answer: (await Database.from('answer').where({ type: 0, status: 1, user_id }).count('* as total'))[0].total,
          customer: (await Database.from('customer').where({ status: 1, relation_user_id: user_id }).count('* as total'))[0].total,
          introducer: (await Database.from('customer').whereIn('status', [1, 2]).where({ user_id: user_id }).count('* as total'))[0].total,
        }

        // user.customer = (await Database.from('customer').where({ status: 1, user_id }).count('* as total'))[0].total

        // 头像主色
        // if (user.avatar_url) {
        //   const imagePath = Application.publicPath(user.avatar_url);
        //   Vibrant.from(imagePath).getPalette().then((palette) => {
        //     let rgb = palette.Vibrant._rgb
        //     user.color = `rgba(${ rgb[0] }, ${ rgb[1] }, ${ rgb[2] }, .2)`
        //   })
        // }

        // IP 属地
        if (user.ip) {
          await axios({
            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ request.ip() }&json=true`,
            responseType: "arraybuffer"
          }).then(function (response) {
            const data = iconv.decode(response.data, 'gbk')
            user.ip = data ? JSON.parse(data) : ''
          }).catch(function (error) {
            // console.log(error)
          })
        }

        // 删除不必要数据
        // delete user.ip_city
        // delete user.brand
        // delete user.platform
        // delete user.system
      }

      return user
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", error);
      return {}
    }
  }

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

  public async review({ params, response, session }: HttpContextContract) {
    try {
      const verify = await Database.from('verification').where({ user_id: session.get('user_id'), table: params.table, field: params.field, is_verified: 0, verification_status: 'pending' }).first()
      response.json({ status: 200, message: "ok", data: verify })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      return error
    }
  }

  public async findUser({ params, request, response, session }: HttpContextContract) {
    try {
      const all = request.all()

      switch (params.type) {
        case 'phone':
          var user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where({ phone: all.value, status: 1 }).first() || {}
          return response.json({ status: 200, message: "ok", data: user })
          break;
        case 'wx_openid':
          var user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where({ wechat_open_id: all.value, status: 1 }).first() || {}
          return response.json({ status: 200, message: "ok", data: user })
          break;
        case 'user_id':
          var user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where({ user_id: all.value, status: 1 }).first() || {}
          return response.json({ status: 200, message: "ok", data: user })
          break;
      }

      return response.json({ status: 404, message: "ok", data: {} })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      return error
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
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), idcard: all.value })
              break;
            case 'school':
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), school: all.value })
              break;
            case 'company':
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), company: all.value })
              break;
            case 'work':
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), work: all.value })
              break;
            case 'job_title':
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), job_title: all.value })
              break;
            case 'salary':
              await Database.table('authentication_log').insert({ user_id: session.get('user_id'), salary: all.value })
              break;
          }
        }

        switch (all.type) {
          case 'idcard':
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ idcard: all.value })
            break;
          case 'school':
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ school: all.value })
            break;
          case 'company':
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ company: all.value })
            break;
          case 'work':
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ work: all.value })
            break;
          case 'job_title':
            await Database.from('authentication_log').where({ user_id: session.get('user_id') }).update({ job_title: all.value })
            break;
          case 'salary':
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
        const authentication = await Database.from('authentication').where({ user_id: all.user_id || session.get('user_id') }).first() || {}
        const authentication_log = await Database.from('authentication_log').where({ user_id: session.get('user_id') }).first() || {}
        data = {
          idcard: authentication.idcard == 1 ? 'approved' : (authentication_log.idcard ? 'pending' : ''),
          school: authentication.school == 1 ? 'approved' : (authentication_log.school ? 'pending' : ''),
          company: authentication.company == 1 ? 'approved' : (authentication_log.company ? 'pending' : ''),
          work: authentication.work == 1 ? 'approved' : (authentication_log.work ? 'pending' : ''),
          job_title: authentication.job_title == 1 ? 'approved' : (authentication_log.job_title ? 'pending' : ''),
          salary: authentication.salary == 1 ? 'approved' : (authentication_log.salary ? 'pending' : ''),
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

  public async updateUserinfo({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      await Database.from('users').where('user_id', session.get('user_id')).update({
        type: all.type,
        nickname: all.nickname,
        avatar_url: all.avatar_url || Avatar.data(all.sex || 0),
        school: all.school,
        company: all.company,
        job_title: all.job_title,
        work: JSON.stringify(all.work),
        work_code: all.work.code || '',
        height: all.height,
        sex: all.sex,
        birthday: all.birthday,
        photos: JSON.stringify(all.photos || []),
        ip: request.ip(),
        modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
      }, ['id'])

      return response.json({
        status: 200,
        sms: "ok",
        data: session.get('user_id')
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  compareArrays(before, after) {
    const changes = { modified: [], added: [], deleted: [] };

    // Check for modified elements
    before.forEach((item, index) => {
      if (after[index] !== item) {
        changes.modified.push({ index, before: item, after: after[index] });
      }
    });

    // Check for added elements
    after.slice(before.length).forEach((item, index) => {
      changes.added.push({ index: index + before.length, item });
    });

    // Check for deleted elements
    before.slice(after.length).forEach((item, index) => {
      changes.deleted.push({ index: index + after.length, item });
    });

    return changes;
  }

  public async updateUserField({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first() || {}
      switch (all.type) {
        case 'avatar_url':
          // await Database.from('users').where('user_id', session.get('user_id')).update({ avatar_url: all.value })
          // 头像 - 加入审核列表
          await Verification.regularData({
            user_id: session.get('user_id'),
            table: 'users',
            field: 'avatar_url',
            before: user.avatar_url,
            value: all.value,
            ip: request.ip()
          })
          break;
        case 'nickname':
          await Database.from('users').where('user_id', session.get('user_id')).update({ nickname: all.value })
          break;
        case 'birthday':
          await Database.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value })
          break;
        case 'height':
          await Database.from('users').where('user_id', session.get('user_id')).update({ height: all.value })
          break;
        case 'weight':
          await Database.from('users').where('user_id', session.get('user_id')).update({ weight: all.value })
          break;
        case 'work':
          await Database.from('users').where('user_id', session.get('user_id')).update({ work: JSON.stringify(all.value || ''), work_code: all.value.code || '' })
          break;
        case 'birthday':
          await Database.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value })
          break;
        case 'detail':
          await Database.from('users').where('user_id', session.get('user_id')).update({ detail: all.value })
          break;
        case 'expectation':
          await Database.from('users').where('user_id', session.get('user_id')).update({ expectation: all.value })
          break;
        case 'phone':
          await Database.from('users').where('user_id', session.get('user_id')).update({ phone: all.value })
          break;
        case 'photos':
          const changes = this.compareArrays(JSON.parse(user.photos), all.value);
          if (changes.added.length) {
            // 照片集 - 加入审核列表
            await Verification.regularData({
              user_id: session.get('user_id'),
              table: 'users',
              field: 'photos',
              before: user.photos,
              value: JSON.stringify(all.value),
              ip: request.ip()
            })
          } else {
            await Database.from('users').where('user_id', session.get('user_id')).update({ photos: JSON.stringify(all.value || []) })
          }
          break;
        case 'videos':
          await Database.from('users').where('user_id', session.get('user_id')).update({ videos: JSON.stringify(all.value || []) })
          break;
        case 'school':
          await Database.from('users').where('user_id', session.get('user_id')).update({ school: all.value.school, education: all.value.education })
          break;
        case 'company':
          await Database.from('users').where('user_id', session.get('user_id')).update({ company: all.value })
          break;
        case 'mbti':
          await Database.from('users').where('user_id', session.get('user_id')).update({ mbti: all.value })
          break;
        case 'location':
          await Database.from('users').where('user_id', session.get('user_id')).update({ location: JSON.stringify(all.value || []) })
          break;
        case 'job_title':
          await Database.from('users').where('user_id', session.get('user_id')).update({ job_title: all.value })
          break;
        case 'salary':
          await Database.from('users').where('user_id', session.get('user_id')).update({ salary: all.value })
          break;
        case 'contact_wechat':
          await Database.from('users').where('user_id', session.get('user_id')).update({ contact_wechat: all.value })
          break;
      }

      response.json({
        status: 200,
        message: "ok"
      })
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  // 推荐上首页
  public async recommendHome({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const recommend = await Database.from('users_recommend').where('customer_id', all.customer_id).orWhere('customer_user_id', all.customer_user_id).first() || {}
      if (recommend.id) {
        const days = Moment().diff(recommend.created_at, 'days')
        if (days < 2) {
          return response.json({ status: 200, message: "ok", data: '该好友最近已被推荐过了哦' })
        } else {
          await Database.from('users_recommend').where('customer_id', all.customer_id).orWhere('customer_user_id', all.customer_user_id).update({ status: 0, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
          return response.json({ status: 200, message: "ok", data: '已推荐' })
        }
      } else {
        const id = await Database.table('users_recommend').insert({ user_id: session.get('user_id'), customer_id: all.customer_id || '', customer_user_id: all.customer_user_id || '', detail: all.detail || '' }).returning('id')
        response.json({ status: 200, message: "ok", data: '已推荐' })
      }
    } catch (error) {
      console.log(error);
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  // 切换用户身份
  public async changeType({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first()
      if (user) {
        await Database.from('users').where('user_id', session.get('user_id')).update({ type: user.type == 1 ? 2 : 1 })
        response.json({
          status: 200,
          message: "ok"
        })
      }
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  // 连接聊天对话
  public async chat({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      if (all.type == 'customer') {
        let customer = await Database.from('customer').select('id', 'user_id', 'introduction', 'relation_log_id', 'relation_user_id').whereIn('status', [1, 2]).where({ id: all.customer_id }).first() || {}
        if (customer.id) {
          // 红娘自行发布用户
          if (customer.relation_log_id) {
            customer = {
              ...customer,
              ...await Database.from('customer_log').select('avatar_url', 'nickname', 'detail').where('id', customer.relation_log_id).first()
            }
          }

          // 关联已存在用户
          if (customer.relation_user_id) {
            customer = {
              ...customer,
              ...await Database.from('users').select('avatar_url', 'nickname', 'detail').where('user_id', customer.relation_user_id).first()
            }
          }
        }
        // const chatroom_left = await Database.from('chatroom').where('chat_users_id', `${ customer.user_id },${ session.get('user_id') }`).first() || {}
        // const chatroom_right = await Database.from('chatroom').where('chat_users_id', `${ session.get('user_id') },${ customer.user_id }`).first() || {}
        // const chatroom = chatroom_left || chatroom_right

        const chatroom = await Database.from('chatroom').where('chat_users_id', `${ customer.user_id },${ session.get('user_id') }`).orWhere('chat_users_id', `${ session.get('user_id') },${ customer.user_id }`).where('status', 1).first() || {}

        if (session.get('user_id') == customer.user_id) {
          return response.json({
            status: 500,
            message: "internalServerError",
            data: 'Unable to chat with oneself'
          })
        }
        if (chatroom.id) {
          return response.json({
            status: 200,
            message: "ok",
            data: {
              customer,
              chat_id: chatroom.chat_id
            }
          })
        } else {
          const chat_id = uuidv4()
          const id = await Database.table('chatroom').insert({ chat_id, chat_users_id: `${ session.get('user_id') },${ customer.user_id }` }).returning('chat_id')
          await Database.table('chats').insert({
            chat_id,
            user_id: session.get('user_id'),
            chat_content: all.customer_id,
            chat_content_type: 'customer',
            chat_ip: request.ip()
          })

          return response.json({
            status: 200,
            message: "ok",
            data: {
              chat_id
            }
          })
        }
      }

      if (all.type == 'user') {
        if (session.get('user_id') == all.user_id) {
          return response.json({
            status: 500,
            message: "internalServerError",
            data: 'Unable to chat with oneself'
          })
        }

        const chatroom = await Database.from('chatroom').where('chat_users_id', `${ all.user_id },${ session.get('user_id') }`).orWhere('chat_users_id', `${ session.get('user_id') },${ all.user_id }`).where('status', 1).first() || {}

        if (chatroom.id) {
          return response.json({
            status: 200,
            message: "ok",
            data: {
              chat_id: chatroom.chat_id
            }
          })
        } else {
          const chat_id = uuidv4()
          const id = await Database.table('chatroom').insert({ chat_id, chat_users_id: `${ session.get('user_id') },${ all.user_id }` }).returning('chat_id')

          return response.json({
            status: 200,
            message: "ok",
            data: {
              chat_id
            }
          })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async chatSend({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      const id = await Database.table('chats').insert({ chat_id: all.chat_id, user_id: session.get('user_id'), chat_content: all.chat_content, chat_content_type: all.chat_content_type, chat_ip: request.ip() })
      await Database.from('chatroom').where({ chat_id: all.chat_id, status: 1 }).update({ modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      await Database.from('chats_log').where({ chat_id: all.chat_id, user_id: session.get('user_id') }).update({ last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      response.json({
        status: 200,
        message: "ok",
        data: id
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  public async messages({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), user_id = session.get('user_id')
      const messages = await Database.from('messages').where({ user_id, status: 1 }).orderBy('created_at', 'asc').forPage(request.input('page', 1), 20)
      const messages_log = await Database.from('messages_log').where({ user_id }).first() || {}
      if (messages_log.id) {
        await Database.from('messages_log').where({ user_id }).update({ last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      } else {
        await Database.table('messages_log').insert({ user_id, last_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      }

      return response.json({
        status: 200,
        message: "ok",
        data: messages
      })
    } catch (error) {
      console.log(error);
      response.json({
        status: 500,
        message: "ok",
        data: error
      })
    }
  }

  public async location({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const location = await Database.from('users_location').where('user_id', session.get('user_id')).first() || {}
      if (location.id) {
        await Database.from('users_location').where('user_id', session.get('user_id')).update({ longitude: all.longitude, latitude: all.latitude })

        // const axios = require('axios');
        //
        // const BMAP_API_URL = 'http://api.map.baidu.com/reverse_geocoding/v3/', AK = 'NvdBjR5UI5ruyioIi5O0Wqn22sseWowA';
        // const params = {
        //   ak: AK,
        //   output: 'json',
        //   location: `${ all.latitude },${ all.longitude }`
        // };
        //
        // const response = await axios.get(BMAP_API_URL, { params });
        // const result = response.data;
        //
        // if (result.status === 0) {
        //   return result.result.formatted_address;
        // } else {
        //   console.error('地理编码API请求失败：' + result.message);
        //   return null;
        // }
      } else {
        await Database.table('users_location').insert({ user_id: session.get('user_id'), longitude: all.longitude, latitude: all.latitude, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      }
      return all
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }

  public async collection({ params, request, response, session }: HttpContextContract) {
    try {
      const like = await Database.from('likes').where({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id') }).first() || {}
      if (!like.id && params.type == 'customer') {
        await Database.table('likes').insert({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id'), ip: request.ip() })
      } else if (like.id && params.type == 'customer') {
        await Database.from('likes').where({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id') }).update({ status: !collection.status, modified_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
      }

      return response.json({ status: 200, message: "ok" })
    } catch (error) {
      console.log(error)
    }
  }

  public async qrcode({ request, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user = await Database.from('users').where('user_id', session.get('user_id')).first()

      return await QrCode.toDataURL(await Jwt.signPrivateKey(user.id), { width: 180 })
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
    }
  }
}
