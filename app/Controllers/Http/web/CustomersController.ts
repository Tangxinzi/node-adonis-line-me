import Database from '@ioc:Adonis/Lucid/Database'

export default class CustomersController {
  async inviteFriendsFill({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('web/customer/invite-friends-fill', {
        data: {
          title: '',
          customer: {
            userinfo: {}
          }
        }
      })
    } catch (error) {

    }
  }
}
