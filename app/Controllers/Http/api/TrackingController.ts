import Database from '@ioc:Adonis/Lucid/Database'
import Moment from'moment'
Moment.locale('zh-cn')

export default class TrackingController {
  public async informationImprovementProcess({ request, response, session }: HttpContextContract) {
    try {
      let all = request.all()

      // 更新用户数据
      if (all.type == 'users' && all.dataset.user) {
        all.updateData = {
          // type: all.type == 'users' ? 1 : 2, // 1 - 用户，2 - 红娘
          avatar_url: all.dataset.user.avatar_url,
          nickname: all.dataset.user.nickname,
          school: all.dataset.user.school,
          company: all.dataset.user.company,
          job_title: all.dataset.user.job_title,
          work: JSON.stringify(all.dataset.user.work),
          work_code: all.work ? all.dataset.user.work.code : '',
          height: all.dataset.user.height,
          sex: all.dataset.user.sex,
          birthday: all.dataset.user.birthday,
          photos: JSON.stringify(all.dataset.user.photos || []),
          ip: request.ip(),
          modified_at: Moment().format('YYYY-MM-DD HH:mm:ss')
        }

        await Database.from('users').where('user_id', session.get('user_id')).update(all.updateData)
      }

      delete all.dataset

      const id = await Database.table('tracking').insert({ type: 'information-improvement-process', user_id: session.get('user_id'), content: JSON.stringify(all) })
      if (id.length) {
        return response.json({ status: 200, message: "ok", data: all.dataset })
      }
    } catch (error) {
      console.log(error);
    }
  }
}
