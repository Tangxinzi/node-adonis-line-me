import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class TrackingController {
  public async informationImprovementProcess({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()      
      const id = await Database.table('tracking').insert({ type: 'information-improvement-process', user_id: session.get('user_id'), content: JSON.stringify(all) })
      if (id.length) {
        response.json({ status: 200, message: "ok" })
      }
    } catch (error) {
      console.log(error);
    }
  }
}
