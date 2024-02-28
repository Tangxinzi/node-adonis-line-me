import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
import randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';
import zpData from '../lib/Zhipin';
import GeoIP from 'geoip-lite';

export default class BusinessesController {
  public async index({ request, view }: HttpContextContract) {
    try {
      const business = await Database.from('business').andWhereNull('deleted_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < business.length; index++) {
        business[index].labels = business[index].labels ? business[index].labels.split(',') : []
        business[index].user = await Database.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', business[index].user_id).first()
        business[index].count = (await Database.from('business_users').where({ business_id: business[index].business_id, status: 1 }).count('* as total'))[0].total || 0
        business[index].created_at = Moment(business[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      return view.render('admin/business/index', {
        data: {
          title: '主体',
          active: 'business',
          business
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, request, view, response }: HttpContextContract) {
    try {      
      const business = await Database.from('business').where('business_id', params.id).andWhereNull('deleted_at').first()
      business.users = (await Database.rawQuery(`
        SELECT business_users.user_id, users.nickname, users.avatar_url, business_users.created_at
        FROM business_users
        JOIN users
        ON business_users.user_id = users.user_id
        WHERE business_users.business_id = '${ params.id }' AND business_users.status = 1
        ORDER BY business_users.created_at DESC
      `))[0]

      for (let index = 0; index < business.users.length; index++) {
        business.users[index].created_at = Moment(business.users[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      business.moments = (await Database.rawQuery(`
        SELECT am.type, am.id, am.business_id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'moment' AS type, id, business_id, user_id, '' AS title, content, photos, '' AS relation_id, created_at
            FROM moments
            WHERE status = 1 AND moments.business_id IS NOT NULL AND moments.business_id != ''
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.user_id, am.business_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at
        ORDER BY am.created_at DESC
        LIMIT ${ request.input('page', 0) * 10 }, 10
      `))[0]

      for (let index = 0; index < business.moments.length; index++) {
        business.moments[index].created_at = Moment(business.moments[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        business.moments[index]['work'] = JSON.parse(business.moments[index]['work'])
        business.moments[index].ip = GeoIP.lookup(business.moments[index].ip)
      }

      return view.render('admin/business/show', {
        data: {
          title: business.name,
          active: 'business',
          business
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async save({ request, session, response }: HttpContextContract) {
    try {
      let all = request.all(), logo = ''

      if (request.file('logo')) {
        const profile = request.file('logo', { type: ['image'], size: '10mb' })
        const profileName = `${randomstring.generate(32)}.${profile.extname}`
        const profilePath = `/uploads/logo/`

        let file = {
          fileName: '',
          fileSrc: ''
        }
        file.fileName = profile.clientName
        file.fileSrc = profilePath + profileName
        await profile.move(Application.publicPath(profilePath), { name: profileName, overwrite: true })

        logo = file.fileSrc
      }

      if (all.button == 'create') {
        const business_id = uuidv4()
        await Database.table('business').insert({
          business_id,
          logo,
          user_id: all.user_id || '',
          name: all.name || '',
          type: all.type || '',
          labels: all.labels || '',
          description: all.description,
        })

        // return response.redirect().toRoute('admin/ArticleController.edit', { id })
        session.flash('message', { type: 'success', header: '创建成功', message: `${ all.name }主体已创建。` })
      }

      if (all.button == 'update') {
        await Database.from('business').where('business_id', all.business_id).update({
          logo: logo || all.logo,
          user_id: all.user_id || '',
          name: all.name || '',
          type: all.type || '',
          labels: all.labels || '',
          description: all.description
        })

        session.flash('message', { type: 'success', header: '更新成功', message: `${ all.name }主体信息已更新。` })
      }

      return response.redirect('back')
    } catch (error) {
      console.log(error)
    }
  }


  public async moments({ params, session, request, view, response }: HttpContextContract) {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }
}
