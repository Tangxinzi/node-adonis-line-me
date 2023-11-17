import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')
import axios from "axios";
import iconv from 'iconv-lite';
import GeoIP from 'geoip-lite';

export default class OperatesController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('admin/operates/index', {
        data: {
          title: '特邀用户 - 运营',
          active: 'operates',
          subActive: 'users',
          all
        }
      })
    } catch (error) {

    }
  }
}
