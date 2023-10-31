import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
const RandomString = require('RandomString')

export default class FilesController {
  public async upload({ request, session }: HttpContextContract) {
    try {
      if (request.file('files')) {
        let file = {}
        const profile = request.file('files', { type: ['image', 'video'], size: '100mb' })
        const profileName = `${RandomString.generate(32)}.${profile.extname}`
        const profilePath = `/uploads/files/`

        file.fileName = profile.clientName
        file.fileSrc = profilePath + profileName

        await profile.move(Application.publicPath(profilePath), {
          name: profileName,
          overwrite: true
        })

        if (profile.state == 'moved') {
          await Database.table('files').insert({
            filePath: file.fileSrc,
            clientName: profile.clientName,
            fileName: profile.fileName,
            fieldName: profile.fieldName,
            size: profile.size,
            type: profile.type,
            subtype: profile.subtype,
            status: profile.status,
            extname: profile.extname,
            related_user_id: session.get('user_id')
          })
        }

        return {
          errno: 0,
          data: {
            url: file.fileSrc
          }
        }
      }

      return { errno: 1, message: '' }
    } catch (e) {
      console.log(e);
      return { errno: 0, message: e }
    }
  }
}
