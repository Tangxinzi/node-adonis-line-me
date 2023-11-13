import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';

export default class WorkController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), catalog = ['其它', '办公室项目分享', '优秀案例']
      const works = await Database.table('land_works')
      for (let index = 0; index < works.length; index++) {
        works[index].catalog = catalog[works[index].catalog]
        works[index].created_at = Moment(works[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      if (all.type == 'json') {
        return response.json({
          status: 200,
          message: "ok",
          data: works
        })
      }

      return view.render('land.admin.work.index', {
        data: {
          title: '作品',
          active: 'work',
          works
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async create({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('land.admin.work.create', {
        data: {
          title: '创建作品',
          active: 'work'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, request, view, response }: HttpContextContract) {
    try {
      const all = request.all()
      const data = await Database.from('land_works').where('id', params.id).first()
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
      return view.render('land.admin.work.edit', {
        data: {
          title: '编辑作品',
          active: 'work'
          work: await Database.from('land_works').where('id', params.id).first()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async save({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all()
      let theme_url = all.theme_url || ''
      if (request.file('theme_url')) {
        const RandomString = require('RandomString')
        const profile = request.file('theme_url', { type: ['image'], size: '2mb' })
        const profileName = `${RandomString.generate(32)}.${profile.extname}`
        const profilePath = `/uploads/theme_urls/`

        let file = {}
        file.fileName = profile.clientName
        file.fileSrc = profilePath + profileName
        await profile.move(Application.publicPath(profilePath), { name: profileName, overwrite: true })

        theme_url = file.fileSrc
      }

      if (request.method() == 'POST' && all.button == 'update') {
        await Database.from('land_works').where('id', all.id).update({ catalog: all.catalog, title: all.title, introduction: all.introduction, work_time: all.work_time, location: all.location, detail: all.detail, theme_url })
        session.flash('message', { type: 'success', header: '更新成功', message: `` })
        return response.redirect('back')
      }

      const id = await Database.table('land_works').returning('id').insert({
        catalog: all.catalog, title: all.title, area: all.area, introduction: all.introduction, work_time: all.work_time, location: all.location, detail: all.detail, theme_url
      })

      session.flash('message', { type: 'success', header: '创建成功', message: `` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${ JSON.stringify(error) }。` })
    }
  }
}
