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
const Zhipin_1 = __importDefault(require("../lib/Zhipin"));
class DescoveriesController {
    async index({ request, response, session }) {
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
            WHERE status = 1 AND moments.business_id IS NULL
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.created_at
        ORDER BY am.created_at DESC
        LIMIT ${request.input('page', 0) * 10}, 10
      `))[0];
            for (let index = 0; index < descovery.length; index++) {
                descovery[index].created_at = (0, moment_1.default)(descovery[index].created_at).fromNow();
                descovery[index].photos = descovery[index].photos ? JSON.parse(descovery[index].photos) : [];
                descovery[index].work = JSON.parse(descovery[index].work);
                if (descovery[index].work && descovery[index].work.value) {
                    descovery[index].work.text = await Zhipin_1.default.data(descovery[index].work.value[0], descovery[index].work.value[1]);
                }
                descovery[index].userinfo = {
                    avatar_url: descovery[index].avatar_url,
                    nickname: descovery[index].nickname,
                    location: descovery[index].location ? JSON.parse(descovery[index].location) : {},
                    age: (0, moment_1.default)().diff(descovery[index].birthday, 'years'),
                    work: descovery[index].work,
                    sex: descovery[index].sex
                };
                delete descovery[index].avatar_url,
                    delete descovery[index].nickname,
                    delete descovery[index].location,
                    delete descovery[index].birthday,
                    delete descovery[index].work,
                    delete descovery[index].sex;
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
                    moment.userinfo = await this.getUserinfo(moment.user_id);
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
                    answer.userinfo = await this.getUserinfo(answer.user_id);
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
    async getUserinfo(user_id) {
        try {
            const user = await Database_1.default.from('users').select('nickname', 'avatar_url', 'location', 'birthday', 'work', 'sex').where({ user_id }).first() || {};
            user.photos = user.photos ? JSON.parse(user.photos) : {};
            user.location = user.location ? JSON.parse(user.location) : {};
            user.age = (0, moment_1.default)().diff(user.birthday, 'years');
            user.work = JSON.parse(user.work);
            if (user.work && user.work.value) {
                user.work.text = await Zhipin_1.default.data(user.work.value[0], user.work.value[1]);
            }
            return user;
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async getComments(type, relation_type_id) {
        try {
            const comments = await Database_1.default.from('comments').where({ type, relation_type_id, status: 1 }), dataset = [];
            for (let index = 0; index < comments.length; index++) {
                dataset[index] = {
                    user_id: comments[index].user_id,
                    userinfo: await this.getUserinfo(comments[index].user_id),
                    comment_content: comments[index].comment_content,
                    created_at: (0, moment_1.default)(comments[index].created_at).format('YYYY-MM-DD HH:mm:ss'),
                };
                if (comments[index].ip) {
                    await (0, axios_1.default)({
                        url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${comments[index].ip}&json=true`,
                        responseType: "arraybuffer"
                    }).then(function (response) {
                        const data = iconv.decode(response.data, 'gbk');
                        dataset[index].ip = data ? JSON.parse(data) : '';
                    }).catch(function (error) {
                    });
                }
            }
            return dataset;
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async personal({ params, request, response, session }) {
        try {
            const all = request.all();
            switch (params.type) {
                case 'likes':
                    let likes = (await Database_1.default.rawQuery(`
            SELECT likes.user_id, likes.type, likes.relation_type_id,
              CASE
                WHEN likes.type = 'answer' THEN answer.content
                WHEN likes.type = 'moment' THEN moments.content
                ELSE 'Unknown Type'
              END AS related_content
            FROM likes
            LEFT JOIN answer ON likes.relation_type_id = answer.id AND likes.type = 'answer'
            LEFT JOIN moments ON likes.relation_type_id = moments.id AND likes.type = 'moment'
            WHERE likes.user_id = '${session.get('user_id')}' AND likes.status = 1 AND likes.type in ('answer', 'moment')
            ORDER BY likes.created_at DESC;
          `))[0];
                    return response.json({ status: 200, message: "ok", data: likes });
                    break;
                case 'comments':
                    let comments = (await Database_1.default.rawQuery(`
            SELECT comments.user_id, comments.type, comments.relation_type_id, comments.comment_content comment,
              CASE
                WHEN comments.type = 'answer' THEN answer.content
                WHEN comments.type = 'moment' THEN moments.content
                ELSE 'Unknown Type'
              END AS related_content,
              CASE
                WHEN comments.type = 'answer' THEN answer.photos
                WHEN comments.type = 'moment' THEN moments.photos
                ELSE 'Unknown Type'
              END AS related_photos,
              users.nickname,
              users.avatar_url,
              comments.created_at
            FROM comments
            LEFT JOIN answer ON comments.relation_type_id = answer.id AND comments.type = 'answer'
            LEFT JOIN moments ON comments.relation_type_id = moments.id AND comments.type = 'moment'
            LEFT JOIN users ON users.user_id = COALESCE(answer.user_id, moments.user_id)
            WHERE comments.user_id = '${session.get('user_id')}' AND comments.status = 1 AND comments.type in ('answer', 'moment')
            ORDER BY comments.created_at DESC;
          `))[0];
                    for (let index = 0; index < comments.length; index++) {
                        comments[index].related_photos = comments[index].related_photos ? JSON.parse(comments[index].related_photos) : [];
                        comments[index].created_at = (0, moment_1.default)(comments[index].created_at).fromNow();
                    }
                    return response.json({ status: 200, message: "ok", data: comments });
                    break;
                default:
                    return response.json({ status: 200, message: "ok", data: [] });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = DescoveriesController;
//# sourceMappingURL=DescoveriesController.js.map