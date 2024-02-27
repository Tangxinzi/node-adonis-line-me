import Database from '@ioc:Adonis/Lucid/Database';
import Application from '@ioc:Adonis/Core/Application';
import Moment from 'moment';
import randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';

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
}
