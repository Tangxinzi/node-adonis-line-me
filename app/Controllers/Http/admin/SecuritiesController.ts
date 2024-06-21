// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecuritiesController {
    public async secCenter({ request, view }: HttpContextContract) {
        try {
            
            return view.render('admin/security/center', {
                data: {
                    title: '内容安全',
                    active: 'security',
                    subActive: 'security-center',
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
