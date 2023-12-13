import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')

export default class DataController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), datas = await Database.table('datas')

      return view.render('admin/datas/index', {
        data: {
          title: '数据',
          active: 'datas',
          datas,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
