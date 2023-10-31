import Database from '@ioc:Adonis/Lucid/Database';
import Moment from'moment';
Moment.locale('zh-cn')

export default class FilesController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const files = await Database.from('files').where({ status: 1 }).orderBy('created_at', 'desc')
      for (let index = 0; index < files.length; index++) {
        files[index].created_at = Moment(files[index].created_at).fromNow()
      }

      return view.render('admin.event.files', {
        data: {
          title: '文件',
          active: 'file',
          files
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
