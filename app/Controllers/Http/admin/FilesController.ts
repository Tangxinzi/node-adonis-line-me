import Database from '@ioc:Adonis/Lucid/Database';
import Drive from '@ioc:Adonis/Core/Drive';
import Moment from 'moment';
Moment.locale('zh-cn')

export default class FilesController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const files = await Database.from('files').where({ status: 1 }).orderBy('id', 'desc').forPage(request.input('page', 1), 20)
      for (let index = 0; index < files.length; index++) {
        files[index].created_at = Moment(files[index].created_at).fromNow()
      }

      return view.render('admin/event/files', {
        data: {
          title: '文件',
          active: 'datas',
          files,
          all
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
