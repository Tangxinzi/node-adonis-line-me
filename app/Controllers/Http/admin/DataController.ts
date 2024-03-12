import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Moment from 'moment'
Moment.locale('zh-cn')

export default class DataController {
  public async index({ request, response, view, session }: HttpContextContract) {
    try {
      const all = request.all(), datas = await Database.table('datas')
      return view.render('admin/datas/index', {
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
            SELECT 'users_add_today' AS type, count(*) AS value, '新增用户' AS text, '人' AS unit FROM users WHERE DATE(created_at) = CURDATE()
            UNION ALL
            SELECT 'users_current_today' AS type, count(*) AS value, '日活跃用户' AS text, '人' AS unit FROM users WHERE DATE(online_at) = CURDATE()
            UNION ALL
            SELECT 'users_current_month' AS type, count(*) AS value, '月活跃用户' AS text, '人' AS unit FROM users WHERE MONTH(online_at) = MONTH(CURDATE()) AND YEAR(online_at) = YEAR(CURDATE())
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
        charts: {
          total: (await Database.rawQuery(`
            SELECT
                date_range.day,
                COALESCE(count_users, 0) AS count_users,
                COALESCE(count_customer, 0) AS count_customer,
                COALESCE(count_moments, 0) AS count_moments
            FROM (
                SELECT DATE_SUB(CURDATE(), INTERVAL seq DAY) AS day,
                      COUNT(users.created_at) AS count_users,
                      COUNT(customer.created_at) AS count_customer,
                      COUNT(moments.created_at) AS count_moments
                FROM (
                    SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
                    SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL 
                    SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL 
                    SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL 
                    SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL 
                    SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL 
                    SELECT 19 UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL 
                    SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL 
                    SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29
                ) AS dates 
                LEFT JOIN users ON DATE(users.created_at) = DATE_SUB(CURDATE(), INTERVAL seq DAY) 
                LEFT JOIN customer ON DATE(customer.created_at) = DATE_SUB(CURDATE(), INTERVAL seq DAY) 
                LEFT JOIN moments ON DATE(moments.created_at) = DATE_SUB(CURDATE(), INTERVAL seq DAY)
                GROUP BY day
                ORDER BY day DESC
            ) date_range
            ORDER BY date_range.day;
          `))[0],
          count: {
            day: [],
            users: [],
            customer: [],
            moments: [],  
          }
        }
      }

      for (var i = 0; i < datas.charts.total.length; i++) {
        datas.charts.count.day.push(Moment(datas.charts.total[i].day).format("YYYY-MM-DD"))
        datas.charts.count.users.push(datas.charts.total[i].count_users)
        datas.charts.count.customer.push(datas.charts.total[i].count_customer)
        datas.charts.count.moments.push(datas.charts.total[i].count_moments)
      }

      return view.render('admin/datas/board', {
        data: {
          title: '平台数据',
          active: 'datas',
          subActive: 'board',
          datas
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

      return view.render('admin/datas/portrait', {
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
