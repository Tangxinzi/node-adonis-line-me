import Env from '@ioc:Adonis/Core/Env';
import Database from '@ioc:Adonis/Lucid/Database'
import RandomString from 'randomstring';
import SMSClient from '@alicloud/sms-sdk';
import Moment from 'moment';
import College from '../lib/College';

export default class CollegeController {
  public async index({ response, request, session }: HttpContextContract) {
    try {
      return await College.data()
    } catch (e) {
      console.log(e);
      return { errno: 0, message: e }
    }
  }
}
