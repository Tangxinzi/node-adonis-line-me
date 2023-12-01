import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';

export default class GoodController {
  public async index({ request, view, response }: HttpContextContract) {
    try {
      const all = request.all()
      const goods = await Database.from('land_goods').select('*').where('status', 1).orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < goods.length; index++) {
        goods[index].catalog = await Database.from('land_goods_catalog').select('*').where({ id: goods[index].good_catalog, status: 1 }).first()
        goods[index].created_at = Moment(goods[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      if (all.type == 'json') {
        const goods = await Database.from('land_goods').select('*').where('status', 1).orderBy('created_at', 'desc').forPage(request.input('page', 1), 8)
        return response.json({
          status: 200,
          message: "ok",
          data: goods
        })
      }

      return view.render('land/admin/good/index', {
        data: {
          title: '商城商品',
          active: 'good',
          goods
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async create({ view }: HttpContextContract) {
    try {
      const catalog = await Database.from('land_goods_catalog').select('*').where({ level: 1, status:  1 }).orderBy('created_at', 'desc')
      for (let index = 0; index < catalog.length; index++) {
        catalog[index].sub_catalog = await Database.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status:  1 })
      }

      return view.render('land/admin/good/create', {
        data: {
          title: '创建商城商品',
          active: 'good',
          catalog
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async catalog({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const catalog = await Database.from('land_goods_catalog').select('*').where({ level: 1, status:  1 }).orderBy('created_at', 'desc')
      for (let index = 0; index < catalog.length; index++) {
        catalog[index].sub_catalog = await Database.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status:  1 })
      }
      if (request.method() == 'GET') {
        return view.render('land/admin/good/catalog', {
          data: {
            title: '目录',
            active: 'good',
            catalog
          }
        })
      }

      if (request.method() == 'POST') {
        console.log(all);
        session.flash('message', { type: 'success', header: '创建成功', message: `` })
        return response.redirect('back')
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, request, view, response }: HttpContextContract) {
    try {
      const all = request.all()
      const good = await Database.from('land_goods').where('id', params.id).first()
      good.created_at = Moment(good.created_at).format('YYYY-MM-DD H:mm:ss')

      const catalog = await Database.from('land_goods_catalog').select('*').where({ level: 1, status:  1 }).orderBy('created_at', 'desc')
      for (let index = 0; index < catalog.length; index++) {
        catalog[index].sub_catalog = await Database.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status:  1 })
      }

      const data = {
        status: 200,
        message: "ok",
        data: good
      }

      if (all.type == 'json') {
        return response.json(data)
      }

      return view.render('land/admin/good/edit', {
        data,
        catalog
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async edit({ params, request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const good = await Database.from('land_goods').where('id', params.id).first()
      const catalog = await Database.from('land_goods_catalog').select('*').where({ level: 1, status:  1 }).orderBy('created_at', 'desc')
      for (let index = 0; index < catalog.length; index++) {
        catalog[index].sub_catalog = await Database.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status:  1 })
      }

      return view.render('land/admin/good/edit', {
        data: {
          title: '编辑商城商品',
          active: 'good'
          good,
          catalog
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async save({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all()
      let good_theme_url = all.theme_url || ''
      if (request.file('theme')) {
        const RandomString = require('RandomString')
        const profile = request.file('theme', { type: ['image', 'video'], size: '10mb' })
        const profileName = `${RandomString.generate(32)}.${profile.extname}`
        const profilePath = `/uploads/themes/`

        let file = {}
        file.fileName = profile.clientName
        file.fileSrc = profilePath + profileName
        await profile.move(Application.publicPath(profilePath), { name: profileName, overwrite: true })

        good_theme_url = file.fileSrc
      }

      if (request.method() == 'POST' && all.button == 'update') {
        await Database.from('land_goods').where('id', all.id).update({
          good_catalog: all.good_catalog || '',
          good_name: all.good_name,
          good_brand: all.good_brand,
          detail: all.detail,
          good_theme_url
        })
        session.flash('message', { type: 'success', header: '更新成功', message: `` })
        return response.redirect('back')
      }

      const id = await Database.table('land_goods').returning('id').insert({
        good_catalog: all.good_catalog || '',
        good_name: all.good_name || '',
        good_brand: all.good_brand || '',
        detail: all.detail || '',
        good_theme_url
      })

      session.flash('message', { type: 'success', header: '创建成功', message: `` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${ JSON.stringify(error) }。` })
    }
  }

  public async delete({ session, request, response }: HttpContextContract) {
    try {
      const all = request.all()
      if (all.button == 'good') {
        await Database.from('land_goods').where('id', all.id).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
        session.flash('message', { type: 'success', header: '商城商品已删除成功！', message: `` })
      }

      if (all.button == 'catalog') {
        await Database.from('land_goods_catalog').where('id', all.id).update({ status: 0, deleted_at: Moment().format('YYYY-MM-DD HH:mm:ss') })
        session.flash('message', { type: 'success', header: '商城商品已删除成功！', message: `` })
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error);
    }
  }
}
