"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const axios_1 = __importDefault(require("axios"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const Zhipin_1 = __importDefault(require("../lib/Zhipin"));
const Data_1 = __importDefault(require("../lib/Data"));
class EventController {
    async descovery({ request, response, session }) {
        try {
            const all = request.all(), descovery = (await Database_1.default.rawQuery(`
        SELECT am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'answer' AS type, id, user_id, '' AS title, content, photos, relation_question_id AS relation_id, created_at
            FROM answer
            WHERE status = 1 AND type = 0
            UNION
            SELECT 'moment' AS type, id, user_id, '' AS title, content, photos, '' AS relation_id, created_at
            FROM moments
            WHERE status = 1
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at
        ORDER BY am.created_at DESC
        LIMIT 10 OFFSET ${request.input('page', 0)}
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
                if (descovery[index].type == 'answer') {
                    const questions = await Database_1.default.from('questions').select('title').where('id', descovery[index].relation_id).first() || {};
                    descovery[index].title = questions.title;
                }
                const like = await Database_1.default.from('likes').where({ relation_type_id: descovery[index].id, type: descovery[index].type, status: 1, user_id: session.get('user_id') || '' }).first() || {};
                descovery[index].like = like && like.id ? true : false;
            }
            response.json({
                status: 200,
                message: "ok",
                data: descovery
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async getUserinfo(user_id) {
        try {
            return await Database_1.default.from('users').select('nickname', 'avatar_url').where({ user_id }).first();
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async getComments(type, relation_type_id) {
        try {
            const comments = await Database_1.default.from('comments').where({ type, relation_type_id, status: 1 }), dataset = [];
            for (let index = 0; index < comments.length; index++) {
                const userinfo = await this.getUserinfo(comments[index].user_id);
                dataset[index] = {
                    user_id: comments[index].user_id,
                    nickname: userinfo.nickname,
                    avatar_url: userinfo.avatar_url,
                    comment_content: comments[index].comment_content,
                    created_at: (0, moment_1.default)(comments[index].created_at).format('YYYY-MM-DD HH:mm:ss'),
                };
                if (comments[index].ip) {
                    await (0, axios_1.default)({
                        url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${comments[index].ip}&json=true`,
                        responseType: "arraybuffer"
                    }).then(function (response) {
                        const data = iconv_lite_1.default.decode(response.data, 'gbk');
                        dataset[index].ip = data ? JSON.parse(data) : '';
                    }).catch(function (error) {
                    });
                }
            }
            return dataset;
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async type({ params, request, response, session }) {
        try {
            const all = request.all();
            const user = this.getUserinfo(session.get('user_id'));
            const like = await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, user_id: session.get('user_id') || '' }).first() || {};
            switch (params.type) {
                case 'moment':
                    let moment = await Database_1.default.from('moments').where('id', params.id).first() || {};
                    moment.data_type = 'moment';
                    moment.like = like && like.id ? true : false;
                    moment.likeNum = (await Database_1.default.from('likes').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0;
                    moment.commentNum = (await Database_1.default.from('comments').where({ relation_type_id: params.id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0;
                    moment.userinfo = await Database_1.default.from('users').where({ user_id: moment.user_id }).first();
                    moment.photos = moment.photos ? JSON.parse(moment.photos) : [];
                    moment.comments = await this.getComments('moment', moment.id);
                    moment.created_at = (0, moment_1.default)(moment.created_at).format('YYYY-MM-DD HH:mm:ss');
                    moment.modified_at = (0, moment_1.default)(moment.modified_at).format('YYYY-MM-DD HH:mm:ss');
                    moment.title = '发布了动态';
                    return response.json({ status: 200, message: "ok", data: moment });
                    break;
                case 'answer':
                    let answer = await Database_1.default.from('answer').where('id', params.id).first() || {};
                    answer.data_type = 'answer';
                    answer.like = like && like.id ? true : false;
                    answer.likeNum = (await Database_1.default.from('likes').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0;
                    answer.commentNum = (await Database_1.default.from('comments').where({ relation_type_id: params.id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0;
                    answer.userinfo = await Database_1.default.from('users').where({ user_id: answer.user_id }).first();
                    answer.photos = answer.photos ? JSON.parse(answer.photos) : [];
                    answer.comments = await this.getComments('answer', answer.id);
                    answer.created_at = (0, moment_1.default)(answer.created_at).format('YYYY-MM-DD HH:mm:ss');
                    answer.modified_at = (0, moment_1.default)(answer.modified_at).format('YYYY-MM-DD HH:mm:ss');
                    const question = await Database_1.default.from('questions').select('title').where('id', answer.relation_question_id).first();
                    answer.title = question.title;
                    return response.json({ status: 200, message: "ok", data: answer });
                    break;
            }
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async datas({ params, request, response, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').where({ id: all.field_value, status: 1 }).first() || {};
            if (customer.id) {
                return await Data_1.default.record({ table: 'customer', field: 'id', field_value: all.field_value, user_id: session.get('user_id'), wechat_open_id: all.wechat_open_id, category: all.category, count: all.count || 1 });
            }
            else {
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async like({ params, request, response, session }) {
        try {
            const all = request.all();
            if (request.method() == 'GET') {
                let customer = [];
                switch (params.type) {
                    case 'customer':
                        customer = await Database_1.default.from('likes').select('customer.id as cid', 'relation_log_id', 'likes.created_at').where({ 'likes.type': 'customer', 'likes.user_id': session.get('user_id') }).join('customer', 'likes.relation_type_id', '=', 'customer.id').where({ 'likes.status': 1, 'customer.status': 1 }).orderBy('likes.created_at', 'desc');
                        for (let index = 0; index < customer.length; index++) {
                            customer[index].created_at = (0, moment_1.default)(customer[index].created_at).format('YYYY-MM-DD HH:mm');
                            if (customer[index].relation_user_id) {
                                const user = await Database_1.default.from('users').select('avatar_url', 'nickname', 'birthday', 'work').where('user_id', customer[index].relation_user_id).first();
                                user.age = (0, moment_1.default)().diff(user.birthday, 'years');
                                user.work = user.work ? JSON.parse(user.work) : [];
                                if (user.work.value) {
                                    user.work.text = await Zhipin_1.default.data(user.work.value[0], user.work.value[1]);
                                }
                                customer[index] = {
                                    ...customer[index],
                                    ...user
                                };
                            }
                            else if (customer[index].relation_log_id) {
                                const customer_log = await Database_1.default.from('customer_log').select('avatar_url', 'nickname', 'birthday', 'work').where('id', customer[index].relation_log_id).first();
                                customer_log.age = (0, moment_1.default)().diff(customer_log.birthday, 'years');
                                customer_log.work = customer_log.work ? JSON.parse(customer_log.work) : [];
                                if (customer_log.work.value) {
                                    customer_log.work.text = await Zhipin_1.default.data(customer_log.work.value[0], customer_log.work.value[1]);
                                }
                                customer[index] = {
                                    ...customer[index],
                                    ...customer_log
                                };
                            }
                        }
                        break;
                }
                return response.json({ status: 200, message: "ok", data: customer });
            }
            if (request.method() == 'POST' && (params.type == 'moment' || params.type == 'answer' || params.type == 'customer')) {
                let data = {};
                const like = await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, user_id: session.get('user_id') }).first();
                if (like && like.id) {
                    data = await Database_1.default.from('likes').where({ relation_type_id: params.id }).update({ status: like.status ? 0 : 1, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() });
                }
                else {
                    data = await Database_1.default.table('likes').insert({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id'), ip: request.ip() });
                }
                const dataLike = await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, user_id: session.get('user_id') }).first();
                data = {
                    ...data,
                    like: dataLike && dataLike.id ? true : false,
                    likeNum: (await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
                    commentNum: (await Database_1.default.from('comments').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
                };
                return response.json({ status: 200, message: "ok", data });
            }
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = EventController;
//# sourceMappingURL=EventController.js.map