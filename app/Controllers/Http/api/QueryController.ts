import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from'moment'
Moment.locale('zh-cn')
const axios = require('axios');

export default class QueryController {
  public async school({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      return new Promise((resolve, reject) => {
        return axios.get(`https://www.zhipin.com/wapi/zpgeek/autocomplete/school.json?query=${ all.query }`)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      });
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }

  public async company({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      return new Promise((resolve, reject) => {
        return axios.get(`https://www.zhipin.com/wapi/zpgeek/autocomplete/company.json?query=${ all.query }`)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
      });
    } catch (error) {
      Logger.error("error 获取失败 %s", JSON.stringify(error));
      response.json({
        status: 500,
        message: "internalServerError",
        data: error
      })
    }
  }
}
