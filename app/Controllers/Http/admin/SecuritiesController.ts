import Database from '@ioc:Adonis/Lucid/Database';
import Moment from 'moment';

export default class SecuritiesController {
	public async secCenter({ request, view }: HttpContextContract) {
		try {
      const security = await Database.from('security').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20)
			for (let index = 0; index < security.length; index++) {
				security[index].created_at =  Moment(security[index].created_at).format('YYYY-MM-DD HH:mm:ss')
			}

			return view.render('admin/security/center', {
				data: {
					title: '内容安全',
					active: 'security',
					subActive: 'security-center',
					security
				}
			})
		} catch (error) {
			console.log(error)
		}
	}
}
