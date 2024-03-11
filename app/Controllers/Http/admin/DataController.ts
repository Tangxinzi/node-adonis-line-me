import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')

export default class DataController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), datas = await Database.table('datas')
      return view.render('admin/datAS/index', {
        data: {
          title: '数据',
          active: 'datas',
          datas,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async board({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), datas = {
        user: (await Database.rawQuery(`
          SELECT data.type, data.value, data.text, data.unit
          FROM (
            SELECT 'users_total' AS type, count(*) AS value, '累计用户' AS text, '人' AS unit FROM users
            UNION ALL
            SELECT 'users_type_1' AS type, count(*) AS value, '介绍人' AS text, '人' AS unit FROM users WHERE type = 1
            UNION ALL
            SELECT 'users_type_2' AS type, count(*) AS value, '普通用户' AS text, '人' AS unit FROM users WHERE type = 2
            UNION ALL
            SELECT 'users_current_today' AS type, count(*) AS value, '今日在线' AS text, '人' AS unit FROM users WHERE DATE(online_at) = CURDATE()
            UNION ALL
            SELECT 'users_add_today' AS type, count(*) AS value, '新增用户' AS text, '人' AS unit FROM users WHERE DATE(created_at) = CURDATE()
          ) AS data
        `))[0],
        customer: (await Database.rawQuery(`
          SELECT data.type, data.value, data.text, data.unit
          FROM (
            SELECT 'customer_total' AS type, count(*) AS value, '累计发布' AS text, '人' AS unit FROM customer WHERE status = 1 AND deleted_at IS NULL
            UNION ALL
            SELECT 'customer_total' AS type, count(*) AS value, '平台推荐' AS text, '人' AS unit FROM customer WHERE status = 1 AND recommend = 1 AND deleted_at IS NULL
            UNION ALL
            SELECT 'customer_total' AS type, count(*) AS value, '待发布' AS text, '人' AS unit FROM customer WHERE status = 2 AND deleted_at IS NULL
            UNION ALL
            SELECT 'customer_today' AS type, count(*) AS value, '今日发布' AS text, '人' AS unit FROM customer WHERE DATE(created_at) = CURDATE()
            UNION ALL
            SELECT 'customer_like' AS type, count(*) AS value, '累计喜欢次数' AS text, '次' AS unit FROM likes WHERE type = 'customer' AND status = 1
          ) AS data
        `))[0],
        dynamics: (await Database.rawQuery(`
          SELECT data.type, data.value, data.text, data.unit
          FROM (
            SELECT 'answer' AS type, count(*) AS value, '个性化问答' AS text, '条' AS unit FROM answer WHERE status = 1 AND type = 0
            UNION ALL
            SELECT 'answer' AS type, count(*) AS value, '为好友介绍' AS text, '条' AS unit FROM answer WHERE status = 1 AND type = 1
            UNION ALL
            SELECT 'moment' AS type, count(*) AS value, '动态' AS text, '条' AS unit FROM moments WHERE status = 1
          ) AS data
        `))[0],
      }

      return view.render('admin/datAS/board', {
        data: {
          title: '平台数据',
          active: 'datas',
          subActive: 'board',
          datas,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async portrait({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), datas = {
        user: (await Database.rawQuery(`
        SELECT data.type, data.value, data.text, data.unit
        FROM (
          SELECT 'users_total' AS type, count(*) AS value, '累计用户' AS text, '人' AS unit FROM users
          UNION ALL
          SELECT 'users_type_1' AS type, count(*) AS value, '介绍人' AS text, '人' AS unit FROM users WHERE type = 1
          UNION ALL
          SELECT 'users_type_2' AS type, count(*) AS value, '普通用户' AS text, '人' AS unit FROM users WHERE type = 2
          UNION ALL
          SELECT 'users_current_today' AS type, count(*) AS value, '今日在线' AS text, '人' AS unit FROM users WHERE DATE(online_at) = CURDATE()
        ) AS data
      `))[0]
      }

      return view.render('admin/datAS/portrait', {
        data: {
          title: '画像洞察',
          active: 'datas',
          subActive: 'portrait',
          datas,
          all
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
