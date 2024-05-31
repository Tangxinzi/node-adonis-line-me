import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')

export default class GiftController {
  public async rewardVideos({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all(), gift = await Database.from('reward-gift').where({ user_id: session.get('user_id') }).orderBy('created_at')

      if (gift.length == 0) {
        const data = await Database.table('reward-gift').insert({ 
          user_id: session.get('user_id'), 
          type: 'video',
          tag: all.vip.type,
          content: all.vip.name + ' - ' + all.vip.tag,
          status: 1, 
          ip: request.ip()
        })

        return response.json({ status: 200, message: "ok", data: data[0] })
      }
      
      return response.json({ status: 200, message: "ok", data: gift })
    } catch (error) {
      console.log(error);
      
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
