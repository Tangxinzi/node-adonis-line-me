"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class DataController {
    async index({ request, response, view, session }) {
        try {
            const all = request.all(), datas = await Database_1.default.table('datas');
            return view.render('admin/datas/index', {
                data: {
                    title: '数据',
                    active: 'datas',
                    datas,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async board({ request, response, view, session }) {
        try {
            const all = request.all(), datas = {
                user: (await Database_1.default.rawQuery(`
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
                customer: (await Database_1.default.rawQuery(`
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
                dynamics: (await Database_1.default.rawQuery(`
          SELECT data.type, data.value, data.text, data.unit
          FROM (
            SELECT 'answer' AS type, count(*) AS value, '个性化问答' AS text, '条' AS unit FROM answer WHERE status = 1 AND type = 0
            UNION ALL
            SELECT 'answer' AS type, count(*) AS value, '为好友介绍' AS text, '条' AS unit FROM answer WHERE status = 1 AND type = 1
            UNION ALL
            SELECT 'moment' AS type, count(*) AS value, '动态' AS text, '条' AS unit FROM moments WHERE status = 1
          ) AS data
        `))[0],
                core: (await Database_1.default.rawQuery(`
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
                charts: {
                    total: (await Database_1.default.rawQuery(`
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
                    core: {
                        day: [],
                        value: []
                    },
                    count: {
                        day: [],
                        users: [],
                        customer: [],
                        moments: [],
                    }
                }
            };
            for (var i = 0; i < datas.charts.total.length; i++) {
                datas.charts.count.day.push((0, moment_1.default)(datas.charts.total[i].day).format("YYYY-MM-DD"));
                datas.charts.count.users.push(datas.charts.total[i].count_users);
                datas.charts.count.customer.push(datas.charts.total[i].count_customer);
                datas.charts.count.moments.push(datas.charts.total[i].count_moments);
            }
            for (let index = 0; index < datas.core.length; index++) {
                datas.charts.core.day.push((0, moment_1.default)(datas.core[index].date).format("MM-DD"));
                datas.charts.core.value.push(datas.core[index].cumulative_users);
            }
            return view.render('admin/datas/board', {
                data: {
                    title: '平台数据',
                    active: 'datas',
                    subActive: 'board',
                    datas
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async portraitUser({ request, response, view, session }) {
        try {
            const datas = {
                charts: {
                    sex: {
                        range: [],
                        value: []
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
                sex: (await Database_1.default.rawQuery(`
          SELECT
              CASE WHEN sex = 1 THEN '男性'
                   WHEN sex = 0 THEN '女性'
                   ELSE '未知'
              END AS gender,
              COUNT(*) AS count
          FROM users
          GROUP BY sex;
        `))[0],
                age: (await Database_1.default.rawQuery(`
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
                city: (await Database_1.default.rawQuery(`
          SELECT COALESCE(ip_city, '未知') AS city, COUNT(*) AS count
          FROM users
          GROUP BY COALESCE(ip_city, '未知');
        `))[0],
            };
            for (let index = 0; index < datas.age.length; index++) {
                datas.charts.age.range.push(datas.age[index].age_group);
                datas.charts.age.value.push(datas.age[index].count);
            }
            for (let index = 0; index < datas.city.length; index++) {
                datas.charts.city.range.push(datas.city[index].city);
                datas.charts.city.value.push(datas.city[index].count);
            }
            return view.render('admin/datas/portrait-user', {
                data: {
                    title: '画像洞察',
                    active: 'datas',
                    subActive: 'portrait-user',
                    datas
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async portraitCustomer({ request, response, view, session }) {
        try {
            const all = request.all(), datas = await Database_1.default.table('datas');
            return view.render('admin/datas/portrait-customer', {
                data: {
                    title: '数据',
                    active: 'datas',
                    datas,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = DataController;
//# sourceMappingURL=DataController.js.map