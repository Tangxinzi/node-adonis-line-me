import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';

export default class DesignerController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const designers = await Database.from('land_designers').where('status', 1)
      for (let index = 0; index < designers.length; index++) {
        designers[index].works = designers[index].works ? designers[index].works.split(',') : []
        designers[index].labels = designers[index].labels ? designers[index].labels.split(',') : []
        designers[index].created_at = Moment(designers[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      if (all.type == 'json') {
        return response.json({
          status: 200,
          message: "ok",
          data: designers
        })
      }

      return view.render('land.admin.designer.index', {
        data: {
          title: '设计师',
          active: 'designer',
          designers
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async create({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('land.admin.designer.create', {
        data: {
          title: '创建设计师',
          active: 'designer',
          works: await Database.table('works')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, request, view, response }: HttpContextContract) {
    try {
      const all = request.all()
      console.log(all);

      const data = await Database.from('land_designers').where('id', params.id).first()
      data.labels = data.labels ? data.labels.split(',') : []
      if (all.type == 'json') {
        return response.json({
          status: 200,
          message: "ok",
          data
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async edit({ params, request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('land.admin.designer.edit', {
        data: {
          title: '编辑设计师',
          active: 'designer',
          works: await Database.table('works'),
          designer: await Database.from('land_designers').where('id', params.id).first()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async save({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all()
      let avatar_url = all.avatar_url || ''
      if (request.file('avatar')) {
        const RandomString = require('RandomString')
        const profile = request.file('avatar', { type: ['image'], size: '2mb' })
        const profileName = `${RandomString.generate(32)}.${profile.extname}`
        const profilePath = `/uploads/avatars/`

        let file = {}
        file.fileName = profile.clientName
        file.fileSrc = profilePath + profileName
        await profile.move(Application.publicPath(profilePath), { name: profileName, overwrite: true })

        avatar_url = file.fileSrc
      }

      if (request.method() == 'POST' && all.button == 'update') {
        await Database.from('land_designers').where('id', all.id).update({ nickname: all.nickname, sex: all.sex, works: all.works, labels: all.labels, detail: all.detail, avatar_url })
        session.flash('message', { type: 'success', header: '更新成功', message: `` })
        return response.redirect('back')
      }

      const id = await Database.table('land_designers').returning('id').insert({
        nickname: all.nickname,
        sex: all.sex,
        labels: all.labels,
        detail: all.detail,
        avatar_url
      })

      session.flash('message', { type: 'success', header: '创建成功', message: `` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${ JSON.stringify(error) }。` })
    }
  }
}
