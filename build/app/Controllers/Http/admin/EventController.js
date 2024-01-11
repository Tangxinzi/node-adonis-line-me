"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const Zhipin_1 = __importDefault(require("../lib/Zhipin"));
class EventController {
    async dataType({ params, request, response, session }) {
        try {
            const all = request.all();
            if (params.type == 'answer') {
                const answer = await Database_1.default.from('answer').where({ id: all.id }).first();
                switch (all.button) {
                    case 'recommend':
                        await Database_1.default.from('answer').where({ id: all.id }).update({ recommend: !answer.recommend });
                        break;
                    case 'delete':
                        await Database_1.default.from('answer').where({ id: all.id }).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                        break;
                }
            }
            if (params.type == 'moment') {
                const moments = await Database_1.default.from('moments').where({ id: all.id }).first();
                switch (all.button) {
                    case 'recommend':
                        await Database_1.default.from('moments').where({ id: all.id }).update({ recommend: !moments.recommend });
                        break;
                    case 'delete':
                        await Database_1.default.from('moments').where({ id: all.id }).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                        break;
                }
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
    async descovery({ request, response, view, session }) {
        try {
            const all = request.all(), data = { moments: [], answer: [] };
            let subtitle = { text: '', value: '' };
            switch (all.type) {
                case 'moments':
                    subtitle.text = ' - 动态';
                    subtitle.value = all.type;
                    data.moments = await Database_1.default.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.recommend', 'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('moments.created_at', 'desc');
                    break;
                case 'answer':
                    subtitle.text = ' - 问答';
                    subtitle.value = all.type;
                    data.answer = await Database_1.default.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.recommend', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('answer.created_at', 'desc');
                    break;
                default:
                    subtitle.value = 'all';
                    data.answer = await Database_1.default.from('answer').select('answer.id', 'answer.relation_question_id', 'answer.user_id', 'answer.content', 'answer.recommend', 'answer.photos', 'answer.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.wechat_open_id').join('users', 'answer.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('answer.created_at', 'desc');
                    data.moments = await Database_1.default.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.recommend', 'moments.photos', 'moments.created_at', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.user_id').join('users', 'moments.user_id', '=', 'users.user_id').limit(10).orderBy('recommend', 'desc').orderBy('moments.created_at', 'desc');
                    break;
            }
            const descovery = (await Database_1.default.rawQuery(`
        SELECT am.type, am.id, am.recommend, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.ip, am.created_at, COUNT(likes.id) AS likeNum, COUNT(comments.id) AS commentNum
        FROM (
            SELECT 'answer' AS type, id, recommend, user_id, '' AS title, content, photos, relation_question_id AS relation_id, ip, created_at
            FROM answer
            WHERE status = 1 AND type = 0
            UNION
            SELECT 'moment' AS type, id, recommend, user_id, '' AS title, content, photos, '' AS relation_id, ip, created_at
            FROM moments
            WHERE status = 1
        ) AS am
        JOIN users ON am.user_id = users.user_id
        LEFT JOIN likes ON am.id = likes.relation_type_id AND likes.type = am.type AND likes.status = 1
        LEFT JOIN comments ON am.id = comments.relation_type_id AND comments.type = am.type AND comments.status = 1
        GROUP BY am.type, am.id, am.recommend, am.user_id, users.nickname, users.avatar_url, users.sex, users.birthday, users.work, users.location, am.title, am.content, am.photos, am.relation_id, am.ip, am.created_at
        ORDER BY am.created_at DESC
        LIMIT 20 OFFSET ${request.input('page', 0)}
      `))[0];
            for (let index = 0; index < descovery.length; index++) {
                descovery[index].photos = JSON.parse(descovery[index].photos);
                descovery[index].location = descovery[index].location ? JSON.parse(descovery[index].location) : {};
                descovery[index].age = (0, moment_1.default)().diff(descovery[index].birthday, 'years');
                descovery[index].created_at = (0, moment_1.default)(descovery[index].created_at).fromNow();
                descovery[index].ip = geoip_lite_1.default.lookup(descovery[index].ip);
                descovery[index]['work'] = JSON.parse(descovery[index]['work']);
                if (descovery[index]['work'] && descovery[index]['work']['value']) {
                    descovery[index]['work']['text'] = await Zhipin_1.default.data(descovery[index]['work']['value'][0], descovery[index]['work']['value'][1]);
                }
                if (descovery[index].type == 'answer') {
                    const questions = await Database_1.default.from('questions').select('title').where('id', descovery[index].relation_id).first() || {};
                    descovery[index].title = questions.title;
                }
            }
            return view.render('admin/event/descovery', {
                data: {
                    title: '论坛',
                    subtitle,
                    active: 'descovery',
                    descovery,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = EventController;
//# sourceMappingURL=EventController.js.map