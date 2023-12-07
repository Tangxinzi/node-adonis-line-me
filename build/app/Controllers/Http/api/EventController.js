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
const zpData = require('../lib/Zhipin');
class EventController {
    async descovery({ request, response, session }) {
        try {
            const all = request.all();
            const moments = await Database_1.default.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.photos', 'moments.ip', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.work', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').where({ 'moments.status': 1, recommend: 1 }).limit(10).orderBy('moments.created_at', 'desc');
            const answer = await Database_1.default.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.photos', 'answer.ip', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.work', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').where({ 'answer.type': 0, 'answer.status': 1, recommend: 1 }).limit(10).orderBy('answer.created_at', 'desc');
            let descovery = [];
            for (let index = 0; index < 10; index++) {
                if (moments[index]) {
                    const like = await Database_1.default.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1, user_id: session.get('user_id') || '' }).first();
                    if (moments[index].ip) {
                        await (0, axios_1.default)({
                            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${moments[index].ip}&json=true`,
                            responseType: "arraybuffer"
                        }).then(function (response) {
                            const data = iconv_lite_1.default.decode(response.data, 'gbk');
                            moments[index].ip = data ? JSON.parse(data) : '';
                        }).catch(function (error) {
                        });
                    }
                    moments[index]['work'] = JSON.parse(moments[index]['work']);
                    if (moments[index]['work'] && moments[index]['work']['value']) {
                        moments[index]['work']['text'] = await zpData.data(moments[index]['work']['value'][0], moments[index]['work']['value'][1]);
                    }
                    descovery.push({
                        id: moments[index].id,
                        user_id: moments[index].user_id,
                        nickname: moments[index].nickname,
                        avatar_url: moments[index].avatar_url,
                        sex: moments[index].sex,
                        title: '发布了动态',
                        content: moments[index].content,
                        photos: moments[index].photos ? JSON.parse(moments[index].photos) : [],
                        age: (0, moment_1.default)().diff(moments[index].birthday, 'years'),
                        work: moments[index].work,
                        data_type: 'moment',
                        like: like && like.id ? true : false,
                        likeNum: (await Database_1.default.from('likes').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
                        commentNum: (await Database_1.default.from('comments').where({ relation_type_id: moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
                        ip: moments[index].ip,
                        created_at: (0, moment_1.default)(moments[index].created_at).fromNow()
                    });
                }
                if (answer[index]) {
                    const like = await Database_1.default.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1, user_id: session.get('user_id') || '' }).first();
                    const question = await Database_1.default.from('questions').select('title').where('id', answer[index].relation_question_id).first() || {};
                    if (answer[index].ip) {
                        await (0, axios_1.default)({
                            url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${answer[index].ip}&json=true`,
                            responseType: "arraybuffer"
                        }).then(function (response) {
                            const data = iconv_lite_1.default.decode(response.data, 'gbk');
                            answer[index].ip = data ? JSON.parse(data) : '';
                        }).catch(function (error) {
                        });
                    }
                    answer[index]['work'] = JSON.parse(answer[index]['work']);
                    if (answer[index]['work'] && answer[index]['work']['value']) {
                        answer[index]['work']['text'] = await zpData.data(answer[index]['work']['value'][0], answer[index]['work']['value'][1]);
                    }
                    descovery.push({
                        id: answer[index].id,
                        user_id: answer[index].user_id,
                        nickname: answer[index].nickname,
                        avatar_url: answer[index].avatar_url,
                        sex: answer[index].sex,
                        title: question.title || '',
                        content: answer[index].content,
                        photos: answer[index].photos ? JSON.parse(answer[index].photos) : [],
                        age: (0, moment_1.default)().diff(answer[index].birthday, 'years'),
                        work: answer[index].work,
                        data_type: 'answer',
                        like: like && like.id ? true : false,
                        likeNum: (await Database_1.default.from('likes').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
                        commentNum: (await Database_1.default.from('comments').where({ relation_type_id: answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
                        ip: answer[index].ip,
                        created_at: (0, moment_1.default)(answer[index].created_at).fromNow()
                    });
                }
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
                    moment.created_at = (0, moment_1.default)(moment.created_at).fromNow();
                    moment.modified_at = (0, moment_1.default)(moment.modified_at).fromNow();
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
                    answer.created_at = (0, moment_1.default)(answer.created_at).fromNow();
                    answer.modified_at = (0, moment_1.default)(answer.modified_at).fromNow();
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
    async like({ params, request, response, session }) {
        try {
            let data = {}, customer = [];
            const all = request.all();
            if (request.method() == 'GET') {
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
                                    user.work.text = await zpData.data(user.work.value[0], user.work.value[1]);
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
                                    customer_log.work.text = await zpData.data(customer_log.work.value[0], customer_log.work.value[1]);
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