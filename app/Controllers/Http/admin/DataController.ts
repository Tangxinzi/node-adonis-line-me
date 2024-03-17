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
            SELECT 'users_current_today' AS type, count(*) AS value, '今日活跃用户' AS text, '人' AS unit FROM users WHERE DATE(online_at) = CURDATE()
            UNION ALL
            SELECT 'users_current_week' AS type, count(*) AS value, '七日活跃用户' AS text, '人' AS unit FROM users WHERE DATE(online_at) >= DATE_SUB(NOW(), INTERVAL 7 DAY)
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
            UNION ALL
            SELECT 'comments' AS type, count(*) AS value, '评论' AS text, '条' AS unit FROM moments WHERE status = 1
          ) AS data
        `))[0],
        core: {
          user: (await Database.rawQuery(`
            SELECT date_sequence.sequence_date AS date, COUNT(u.id) AS cumulative_users
            FROM (
              SELECT DATE_ADD(CURDATE(), INTERVAL - (a.a + (10 * b.a) + (100 * c.a)) DAY) AS sequence_date
              FROM
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
                CROSS JOIN
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
                CROSS JOIN
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
            ) AS date_sequence
            LEFT JOIN users u ON DATE(u.created_at) <= DATE(date_sequence.sequence_date)
            WHERE date_sequence.sequence_date >= CURDATE() - INTERVAL 99 DAY
            GROUP BY date_sequence.sequence_date
            ORDER BY date_sequence.sequence_date;
          `))[0],
          customer: (await Database.rawQuery(`
            SELECT date_sequence.sequence_date AS date, COUNT(c.id) AS cumulative_customer
            FROM (
              SELECT DATE_ADD(CURDATE(), INTERVAL - (a.a + (10 * b.a) + (100 * c.a)) DAY) AS sequence_date
              FROM
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
                CROSS JOIN
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
                CROSS JOIN
                (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
            ) AS date_sequence
            LEFT JOIN customer c ON DATE(c.created_at) <= DATE(date_sequence.sequence_date)
            WHERE date_sequence.sequence_date >= CURDATE() - INTERVAL 99 DAY
            GROUP BY date_sequence.sequence_date
            ORDER BY date_sequence.sequence_date;
          `))[0],
        },
        charts: {
          total: (await Database.rawQuery(`
            SELECT
              date_range.day,
              COALESCE(count_users, 0) AS count_users,
              COALESCE(count_customer, 0) AS count_customer,
              COALESCE(count_moments, 0) AS count_moments,
              COALESCE(count_answer, 0) AS count_answer
            FROM (
              SELECT DATE_SUB(CURDATE(), INTERVAL seq DAY) AS day,
                COUNT(users.created_at) AS count_users,
                COUNT(customer.created_at) AS count_customer,
                COUNT(moments.created_at) AS count_moments,
                COUNT(answer.created_at) AS count_answer
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
              LEFT JOIN answer ON DATE(answer.created_at) = DATE_SUB(CURDATE(), INTERVAL seq DAY)
              GROUP BY day
              ORDER BY day DESC
            ) date_range
            ORDER BY date_range.day;
          `))[0],
          core: {
            user: {
              day: [],
              value: []
            },
            customer: {
              day: [],
              value: []
            },
            descovery: {
              day: [],
              value: []
            },
          },
          count: {
            day: [],
            users: [],
            customer: [],
            moments: [],
            answer: [],
          }
        }
      }

      for (var i = 0; i < datas.charts.total.length; i++) {
        datas.charts.count.day.push(Moment(datas.charts.total[i].day).format("YYYY-MM-DD"))
        datas.charts.count.users.push(datas.charts.total[i].count_users)
        datas.charts.count.customer.push(datas.charts.total[i].count_customer)
        datas.charts.count.moments.push(datas.charts.total[i].count_moments)
        datas.charts.count.answer.push(datas.charts.total[i].count_answer)
      }

      for (let index = 0; index < datas.core.user.length; index++) {
        datas.charts.core.user.day.push(Moment(datas.core.user[index].date).format("MM-DD"))
        datas.charts.core.user.value.push(datas.core.user[index].cumulative_users)
      }

      for (let index = 0; index < datas.core.customer.length; index++) {
        datas.charts.core.customer.day.push(Moment(datas.core.customer[index].date).format("MM-DD"))
        datas.charts.core.customer.value.push(datas.core.customer[index].cumulative_customer)
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

  public async portraitUser({ request, response, view, session }: HttpContextContract) {
    try {
      const datas = {
        charts: {
          sex: {
            range: [],
            value: []
          },
          sexTrend: {
            date: [],
            female: [],
            male: [],
          },
          age: {
            range: [],
            value: []
          },
          city: {
            range: [],
            value: []
          }
        },
        sex: (await Database.rawQuery(`
          SELECT
              CASE WHEN sex = 1 THEN '男性'
                   WHEN sex = 0 THEN '女性'
                   ELSE '未知'
              END AS gender,
              COUNT(*) AS count
          FROM users
          GROUP BY sex;
        `))[0],
        sexTrend: (await Database.rawQuery(`
          SELECT
              DATE_SUB(CURDATE(), INTERVAL days_diff DAY) AS date,
              IFNULL(SUM(CASE WHEN sex = 0 THEN 1 ELSE 0 END), 0) AS female,
              IFNULL(SUM(CASE WHEN sex = 1 THEN 1 ELSE 0 END), 0) AS male
          FROM (
              SELECT 0 AS days_diff
              UNION ALL
              SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
              SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
              SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL
              SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL
              SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL
              SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL
              SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL
              SELECT 29 UNION ALL SELECT 30 UNION ALL SELECT 31 UNION ALL SELECT 32 UNION ALL
              SELECT 33 UNION ALL SELECT 34 UNION ALL SELECT 35 UNION ALL SELECT 36 UNION ALL
              SELECT 37 UNION ALL SELECT 38 UNION ALL SELECT 39 UNION ALL SELECT 40 UNION ALL
              SELECT 41 UNION ALL SELECT 42 UNION ALL SELECT 43 UNION ALL SELECT 44 UNION ALL
              SELECT 45 UNION ALL SELECT 46 UNION ALL SELECT 47 UNION ALL SELECT 48 UNION ALL
              SELECT 49
          ) AS days
          LEFT JOIN users ON DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL days_diff DAY)
          GROUP BY days_diff
          ORDER BY days_diff DESC;
        `))[0],
        age: (await Database.rawQuery(`
          SELECT
              CONCAT(FLOOR((age_range.min_age) / 5) * 5 + 1, '-', FLOOR((age_range.max_age) / 5) * 5 + 5) AS age_group,
              COALESCE(COUNT(users.id), 0) AS count
          FROM (
              SELECT
                  seq.seq * 5 AS min_age,
                  (seq.seq + 1) * 5 - 1 AS max_age
              FROM
                  (SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS seq
          ) AS age_range
          LEFT JOIN users ON TIMESTAMPDIFF(YEAR, STR_TO_DATE(users.birthday, '%Y-%m-%d'), CURDATE()) BETWEEN age_range.min_age AND age_range.max_age
          GROUP BY age_range.min_age, age_range.max_age
          ORDER BY age_range.min_age;
        `))[0],
        city: (await Database.rawQuery(`
          SELECT COALESCE(ip_city, '未知') AS city, COUNT(*) AS count
          FROM users
          GROUP BY COALESCE(ip_city, '未知');
        `))[0],
      }

      for (let index = 0; index < datas.age.length; index++) {
        datas.charts.age.range.push(datas.age[index].age_group)
        datas.charts.age.value.push(datas.age[index].count)
      }

      for (let index = 0; index < datas.sexTrend.length; index++) {
        datas.charts.sexTrend.date.push(Moment(datas.sexTrend[index].date).format("YYYY-MM-DD"))
        datas.charts.sexTrend.female.push(datas.sexTrend[index].female)
        datas.charts.sexTrend.male.push(datas.sexTrend[index].male)
      }

      for (let index = 0; index < datas.city.length; index++) {
        datas.charts.city.range.push(datas.city[index].city)
        datas.charts.city.value.push(datas.city[index].count)
      }

      return view.render('admin/datas/portrait-user', {
        data: {
          title: '用户画像',
          active: 'datas',
          subActive: 'portrait-user',
          datas
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  public async portraitCustomer({ request, response, view, session }: HttpContextContract) {
    try {
      const datas = {
        charts: {
          sex: {
            range: [],
            value: []
          },
          sexTrend: {
            date: [],
            female: [],
            male: [],
          },
          age: {
            range: [],
            value: []
          },
          city: {
            range: [],
            value: []
          }
        },
        sex: (await Database.rawQuery(`
          SELECT
              CASE WHEN sex = 1 THEN '男性'
                   WHEN sex = 0 THEN '女性'
                   ELSE '未知'
              END AS gender,
              COUNT(*) AS count
          FROM customer_log
          GROUP BY sex;
        `))[0],
        sexTrend: (await Database.rawQuery(`
          SELECT
              DATE_SUB(CURDATE(), INTERVAL days_diff DAY) AS date,
              IFNULL(SUM(CASE WHEN sex = 0 THEN 1 ELSE 0 END), 0) AS female,
              IFNULL(SUM(CASE WHEN sex = 1 THEN 1 ELSE 0 END), 0) AS male
          FROM (
              SELECT 0 AS days_diff
              UNION ALL
              SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
              SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL
              SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL
              SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL SELECT 16 UNION ALL
              SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL
              SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL
              SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL
              SELECT 29 UNION ALL SELECT 30 UNION ALL SELECT 31 UNION ALL SELECT 32 UNION ALL
              SELECT 33 UNION ALL SELECT 34 UNION ALL SELECT 35 UNION ALL SELECT 36 UNION ALL
              SELECT 37 UNION ALL SELECT 38 UNION ALL SELECT 39 UNION ALL SELECT 40 UNION ALL
              SELECT 41 UNION ALL SELECT 42 UNION ALL SELECT 43 UNION ALL SELECT 44 UNION ALL
              SELECT 45 UNION ALL SELECT 46 UNION ALL SELECT 47 UNION ALL SELECT 48 UNION ALL
              SELECT 49
          ) AS days
          LEFT JOIN customer_log ON DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL days_diff DAY)
          GROUP BY days_diff
          ORDER BY days_diff DESC;
        `))[0],
        age: (await Database.rawQuery(`
          SELECT
              CONCAT(FLOOR((age_range.min_age) / 5) * 5 + 1, '-', FLOOR((age_range.max_age) / 5) * 5 + 5) AS age_group,
              COALESCE(COUNT(customer_log.id), 0) AS count
          FROM (
              SELECT
                  seq.seq * 5 AS min_age,
                  (seq.seq + 1) * 5 - 1 AS max_age
              FROM
                  (SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS seq
          ) AS age_range
          LEFT JOIN customer_log ON TIMESTAMPDIFF(YEAR, STR_TO_DATE(customer_log.birthday, '%Y-%m-%d'), CURDATE()) BETWEEN age_range.min_age AND age_range.max_age
          GROUP BY age_range.min_age, age_range.max_age
          ORDER BY age_range.min_age;
        `))[0],
        // city: (await Database.rawQuery(`
        //   SELECT COALESCE(ip_city, '未知') AS city, COUNT(*) AS count
        //   FROM customer_log
        //   GROUP BY COALESCE(ip_city, '未知');
        // `))[0],
      }

      for (let index = 0; index < datas.age.length; index++) {
        datas.charts.age.range.push(datas.age[index].age_group)
        datas.charts.age.value.push(datas.age[index].count)
      }

      for (let index = 0; index < datas.sexTrend.length; index++) {
        datas.charts.sexTrend.date.push(Moment(datas.sexTrend[index].date).format("YYYY-MM-DD"))
        datas.charts.sexTrend.female.push(datas.sexTrend[index].female)
        datas.charts.sexTrend.male.push(datas.sexTrend[index].male)
      }

      // for (let index = 0; index < datas.city.length; index++) {
      //   datas.charts.city.range.push(datas.city[index].city)
      //   datas.charts.city.value.push(datas.city[index].count)
      // }

      return view.render('admin/datas/portrait-customer', {
        data: {
          title: '介绍画像',
          active: 'datas',
          subActive: 'portrait-customer',
          datas
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
