"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
const Zhipin_1 = __importDefault(require("../lib/Zhipin"));
class BusinessesController {
    async index({ request, view, response }) {
    }
    async show({ params, response }) {
        try {
            const business = await Database_1.default.from('business').where('business_id', params.id).andWhereNull('deleted_at').first() || {};
            business.labels = business.labels ? business.labels.split(',') : [];
            business.users = (await Database_1.default.rawQuery(`
        SELECT business_users.user_id, users.nickname, users.avatar_url, business_users.created_at
        FROM business_users
        JOIN users
        ON business_users.user_id = users.user_id
        WHERE business_users.business_id = '${params.id}' AND business_users.status = 1
        ORDER BY business_users.created_at DESC
      `))[0];
            for (let index = 0; index < business.users.length; index++) {
                business.users[index].created_at = (0, moment_1.default)(business.users[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return response.json({ status: 200, message: "ok", data: business });
        }
        catch (error) {
            console.log(error);
        }
    }
    async lists({ params, session, request, view, response }) {
        try {
            const business = (await Database_1.default.rawQuery(`
        SELECT business.business_id, business.name, business.description, business.labels, business.logo
        FROM business_users
        JOIN business
        WHERE business_users.user_id = '${session.get('user_id')}' AND business_users.business_id = business.business_id
        ORDER BY business_users.created_at DESC
      `))[0];
            for (let index = 0; index < business.length; index++) {
                business[index].labels = business[index].labels ? business[index].labels.split(',') : [];
            }
            return response.json({ status: 200, message: "ok", data: business });
        }
        catch (error) {
            console.log(error);
        }
    }
    async moments({ params, session, request, view, response }) {
        try {
            const all = request.all(), descovery = (await Database_1.default.rawQuery(`
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
        LIMIT ${request.input('page', 0) * 10}, 10
      `))[0];
            for (let index = 0; index < descovery.length; index++) {
                descovery[index].photos = JSON.parse(descovery[index].photos);
                descovery[index].location = descovery[index].location ? JSON.parse(descovery[index].location) : {};
                descovery[index].age = (0, moment_1.default)().diff(descovery[index].birthday, 'years');
                descovery[index].created_at = (0, moment_1.default)(descovery[index].created_at).fromNow();
                descovery[index]['work'] = JSON.parse(descovery[index]['work']);
                if (descovery[index]['work'] && descovery[index]['work']['value']) {
                    descovery[index]['work']['text'] = await Zhipin_1.default.data(descovery[index]['work']['value'][0], descovery[index]['work']['value'][1]);
                }
                const like = await Database_1.default.from('likes').where({ relation_type_id: descovery[index].id, type: descovery[index].type, status: 1, user_id: session.get('user_id') || '' }).first() || {};
                descovery[index].like = like && like.id ? true : false;
            }
            return response.json({ status: 200, message: "ok", data: descovery });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map