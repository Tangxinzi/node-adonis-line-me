import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
import randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';
import zpData from '../lib/Zhipin';

export default class BusinessesController {
  public async index({ request, view, response }: HttpContextContract) {

  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const business = await Database.from('business').where('business_id', params.id).andWhereNull('deleted_at').first() || {}
      business.labels = business.labels ? business.labels.split(',') : []

      business.users = (await Database.rawQuery(`
        SELECT business_users.user_id, users.nickname, users.avatar_url, business_users.created_at
        FROM business_users
        JOIN users
        ON business_users.user_id = users.user_id
        WHERE business_users.business_id = '${ params.id }' AND business_users.status = 1
        ORDER BY business_users.created_at DESC
      `))[0]

      for (let index = 0; index < business.users.length; index++) {
        business.users[index].created_at = Moment(business.users[index].created_at).format('YYYY-MM-DD HH:mm:ss')
      }

      return response.json({ status: 200, message: "ok", data: business })
    } catch (error) {
      console.log(error)
    }
  }

  public async lists({ params, session, request, view, response }: HttpContextContract) {
    try {
      const business = (await Database.rawQuery(`
        SELECT business.business_id, business.name, business.description, business.labels, business.logo
        FROM business_users
        JOIN business
        WHERE business_users.user_id = '${ session.get('user_id') }' AND business_users.business_id = business.business_id
        ORDER BY business_users.created_at DESC
      `))[0]

      for (let index = 0; index < business.length; index++) {
        business[index].labels = business[index].labels ? business[index].labels.split(',') : []
      }

      return response.json({ status: 200, message: "ok", data: business })
    } catch (error) {
      console.log(error)
    }
  }

  public async moments({ params, session, request, view, response }: HttpContextContract) {
    try {
      const all = request.all(), descovery = (await Database.rawQuery(`
        SELECT am.type, am.id, am.business_id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'moment' AS type, id, business_id, user_id, '' AS title, content, photos, '' AS relation_id, created_at
            FROM moments
            WHERE status = 1 AND moments.business_id IS NOT NULL AND moments.business_id != ''
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.user_id, am.business_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at
        ORDER BY am.created_at DESC
        LIMIT ${ request.input('page', 0) * 10 }, 10
      `))[0]

      for (let index = 0; index < descovery.length; index++) {
        descovery[index].photos = JSON.parse(descovery[index].photos)
        descovery[index].location = descovery[index].location ? JSON.parse(descovery[index].location) : {}
        descovery[index].age = Moment().diff(descovery[index].birthday, 'years')
        descovery[index].created_at = Moment(descovery[index].created_at).fromNow()
        descovery[index]['work'] = JSON.parse(descovery[index]['work'])
        if (descovery[index]['work'] && descovery[index]['work']['value']) {
          descovery[index]['work']['text'] = await zpData.data(descovery[index]['work']['value'][0], descovery[index]['work']['value'][1])
        }

        const like = await Database.from('likes').where({ relation_type_id: descovery[index].id, type: descovery[index].type, status: 1, user_id: session.get('user_id') || '' }).first() || {}
        descovery[index].like = like && like.id ? true : false

        // IP
        // if (descovery[index].ip) {
        //   await axios({
        //     url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${ descovery[index].ip }&json=true`,
        //     responseType: "arraybuffer"
        //   }).then(function (response) {
        //     const data = iconv.decode(response.data, 'gbk')
        //     descovery[index].ip = data ? JSON.parse(data) : ''
        //   }).catch(function (error) {
        //     // console.log(error)
        //   })
        // }
      }

      return response.json({ status: 200, message: "ok", data: descovery })
    } catch (error) {
      console.log(error)
    }
  }
}
