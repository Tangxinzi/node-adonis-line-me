import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')

export default class TrackingController {
  public async eventTrackingID({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const tracking = await Database.from('tracking').where({ type: 'information-improvement-process' }).orderBy('created_at', 'desc').forPage(request.input('page', 1), 30)
      for (let index = 0; index < tracking.length; index++) {
        tracking[index].content = JSON.parse(tracking[index].content)
        tracking[index].content.type = tracking[index].content.type == 'users' ? '注册' : '介绍'
        tracking[index].created_at = Moment(tracking[index].created_at).format('YYYY-MM-DD HH:mm:ss')
        tracking[index].content.itemStayValue = {
          userType: {},
          userAvatarNick: {},
          userSex: {},
          userHeight: {},
          userBirthday: {},
          userWork: {},
          userPhotos: {},
          userSchool: {},
          userCompany: {},
          userJobTitle: {}
        }

        for (let typeIndex = 0; typeIndex < tracking[index].content.itemStayType.length; typeIndex++) {
          tracking[index].userinfo = await Database.from('users').select('avatar_url', 'nickname', 'phone').where({ user_id: tracking[index].user_id }).first() || {}

          switch (tracking[index].content.itemStayType[typeIndex]) {
            case 'userType':
              tracking[index].content.itemStayValue.userType = {
                text: '角色',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userAvatarNick':
              tracking[index].content.itemStayValue.userAvatarNick = {
                text: '头像',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userSex':
              tracking[index].content.itemStayValue.userSex = {
                text: '性别',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userHeight':
              tracking[index].content.itemStayValue.userHeight = {
                text: '身高',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userBirthday':
              tracking[index].content.itemStayValue.userBirthday = {
                text: '生日',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userSchool':
              tracking[index].content.itemStayValue.userSchool = {
                text: '学校',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userCompany':
              tracking[index].content.itemStayValue.userCompany = {
                text: '公司',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userJobTitle':
              tracking[index].content.itemStayValue.userJobTitle = {
                text: '职位',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userWork':
              tracking[index].content.itemStayValue.userWork = {
                text: '行业',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            case 'userPhotos':
              tracking[index].content.itemStayValue.userPhotos = {
                text: '照片',
                time: tracking[index].content.itemStayTime[typeIndex]
              }
              break;
            default:

          }

          // tracking[index].content.itemStayValue[typeIndex] = {
          //   text,
          //   type: tracking[index].content.itemStayType[typeIndex],
          //   time: tracking[index].content.itemStayTime[typeIndex],
          // }
        }

        switch (tracking[index].content.node) {
          case 'userType':
            tracking[index].content.node = '角色';
            break;
          case 'userAvatarNick':
            tracking[index].content.node = '头像';
            break;
          case 'userSex':
            tracking[index].content.node = '性别';
            break;
          case 'userHeight':
            tracking[index].content.node = '身高';
            break;
          case 'userBirthday':
            tracking[index].content.node = '生日';
            break;
          case 'userCompany':
            tracking[index].content.node = '公司';
            break;
          case 'userJobTitle':
            tracking[index].content.node = '职位';
            break;
          case 'userWork':
            tracking[index].content.node = '行业';
            break;
          case 'userSchool':
            // tracking[index].content.node = '学校';
            // break;
          case 'userPhotos':
            // tracking[index].content.node = '照片';
            // break;
          case 'userOver':
            tracking[index].content.node = 'END';
            break;
          default:
            break;
        }

        delete tracking[index].content.itemStayType, delete tracking[index].content.itemStayTime
      }

      // return tracking

      return view.render('admin/event-tracking/information-improvement-process', {
        data: {
          title: '[IIP] 注册流程',
          active: 'datas',
          tracking,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
