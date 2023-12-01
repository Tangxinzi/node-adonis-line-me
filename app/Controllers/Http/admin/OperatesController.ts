import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Jwt from 'App/Models/Jwt';
import Moment from 'moment'
Moment.locale('zh-cn')
const Verification = require('../lib/Verification');

export default class OperatesController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), operates = await Database.table('users_operates')
      for (let index = 0; index < operates.length; index++) {
        operates[index].customerTotal = (await Database.from('customer').where({ status: 1, user_id: operates[index].user_id }).count('* as total'))[0].total
        operates[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: operates[index].user_id }).first()
        operates[index].created_at = Moment(operates[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        operates[index].modified_at = Moment(operates[index].modified_at).format('YYYY-MM-DD HH:mm:ss')
      }

      return view.render('admin/operates/index', {
        data: {
          title: '权限用户 - 运营',
          active: 'operates',
          subActive: 'users',
          operates,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async save({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const user_id = all.user_id.split(',')
      for (let index = 0; index < user_id.length; index++) {
        await Database.table('users_operates').returning('id').insert({ type: all.type, user_id: user_id[index] })
      }

      session.flash('message', { type: 'success', header: '创建成功', message: `已添加特邀用户 ${ JSON.stringify(user_id) }` })
      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }

  public async incentive({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), verification = await Database.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < verification.length; index++) {
        if (verification[index].field == 'photos') {
          verification[index].before = JSON.parse(verification[index].before)
          verification[index].value = JSON.parse(verification[index].value)
        }
        verification[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].user_id }).first()
        verification[index].checker = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].verification_user_id }).first() || {}
        verification[index].verification_status = verification[index].verification_status.toUpperCase()
        verification[index].created_at = Moment(verification[index].created_at).fromNow()
        verification[index].modified_at = verification[index].modified_at ? Moment(verification[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : ''
      }

      return view.render('admin/operates/incentive', {
        data: {
          title: '内容审核 - 运营',
          active: 'operates',
          subActive: 'verification',
          verification,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async verification({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), verification = await Database.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < verification.length; index++) {
        if (verification[index].field == 'photos') {
          verification[index].before = JSON.parse(verification[index].before)
          verification[index].value = JSON.parse(verification[index].value)
        }
        verification[index].userinfo = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].user_id }).first()
        verification[index].checker = await Database.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].verification_user_id }).first() || {}
        verification[index].verification_status = verification[index].verification_status.toUpperCase()
        verification[index].created_at = Moment(verification[index].created_at).fromNow()
        verification[index].modified_at = verification[index].modified_at ? Moment(verification[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : ''
      }

      return view.render('admin/operates/verification', {
        data: {
          title: '内容审核 - 运营',
          active: 'operates',
          subActive: 'verification',
          verification,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async review({ params, request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), verification = await Database.from('verification').where({ id: params.id }).first()
      if (request.method() == 'GET') {
        if (verification.is_verified == 0) {
          var user = all.sign ? await Database.from('users').where('id', Jwt.verifyPublicKey(all.sign)).first() : {}
        } else {
          var user = await Database.from('users').where('user_id', verification.verification_user_id).first() || {}
        }

        const review = await Database.from('users').where({ user_id: verification.user_id }).first()
        verification.created_at = Moment(verification.created_at).format('YYYY-MM-DD HH:mm:ss')
        verification.modified_at = verification.modified_at ? Moment(verification.modified_at).format('YYYY-MM-DD HH:mm:ss') : ''

        switch (verification.field) {
          case 'avatar_url':
            break;
          case 'photos':
            verification.before = JSON.parse(verification.before)
            verification.value = JSON.parse(verification.value)
            break;
        }

        return view.render('admin/operates/review', {
          data: {
            title: '内容审核 - 运营',
            active: 'operates',
            subActive: 'verification',
            verification,
            review,
            user,
            all
          }
        })
      }

      if (request.method() == 'POST') {
        const action = await Verification.action(verification, {
          id: params.id,
          verification_comment: all.verification_comment || '',
          verification_status: all.verification_status,
          verification_user_id: all.verification_user_id
        })

        if (action) {
          session.flash('message', { type: 'success', header: '已操作', message: `${ JSON.stringify(all) }` })
        } else {
          session.flash('message', { type: 'error', header: '提交失败', message: `请检查您的账号状态或联系管理员。` })
        }

        return response.redirect('back')
      }
    } catch (error) {
      console.log(error);
    }
  }
}
