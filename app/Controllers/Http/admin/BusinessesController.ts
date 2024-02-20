import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
import randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';

export default class BusinessesController {
  public async index({ request, view, response }: HttpContextContract) {
    try {
      const all = request.all()
      const business = await Database.from('business').andWhereNull('deleted_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < business.length; index++) {
        business[index].created_at = Moment(business[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      return view.render('admin/business/index', {
        data: {
          title: '机构',
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

  public async create({ request, session, response }: HttpContextContract) {
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
      
      const business_id = uuidv4()
      await Database.table('business').insert({ 
        business_id, 
        logo,
        user_id: '',
        name: all.name,
        description: all.description,
      })

      // return response.redirect().toRoute('admin/ArticleController.edit', { id }) 
      session.flash('message', { type: 'success', header: '创建成功', message: `${ all.name }主体已创建。` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
    }
  }
}
