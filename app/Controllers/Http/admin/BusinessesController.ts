import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
import randomstring from 'randomstring';

export default class BusinessesController {
  public async index({ request, view, response }: HttpContextContract) {
    try {
      const all = request.all(), catalog = ['其它', '活动资讯', '首页 Banner']
      const articles = await Database.from('articles').select('id', 'article_catalog', 'article_title', 'article_author', 'article_detail', 'article_theme_url', 'article_original_url', 'status', 'target', 'created_at').andWhereNull('deleted_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < articles.length; index++) {
        articles[index].catalog = catalog[articles[index].article_catalog]
        articles[index].created_at = Moment(articles[index].created_at).format('YYYY-MM-DD H:mm:ss')
      }

      return view.render('admin/business/index', {
        data: {
          title: '企业',
          active: 'business'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async show({ params, request, view, response }: HttpContextContract) {
    try {
      return view.render('admin/business/show', {
        data: {
          title: 'TEST 企业',
          active: 'business'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
