"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const geoip_lite_1 = __importDefault(require("geoip-lite"));
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
                        await Database_1.default.from('answer').where({ id: all.id }).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss') });
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
                        await Database_1.default.from('moments').where({ id: all.id }).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD hh:mm:ss') });
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
            let descovery = [];
            for (let index = 0; index < 10; index++) {
                if (data.moments.length && data.moments[index]) {
                    const like = await Database_1.default.from('likes').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1, user_id: session.get('user_id') || '' }).first();
                    descovery.push({
                        id: data.moments[index].id,
                        recommend: data.moments[index].recommend,
                        user_id: data.moments[index].user_id,
                        nickname: data.moments[index].nickname,
                        avatar_url: data.moments[index].avatar_url,
                        sex: data.moments[index].sex,
                        title: '',
                        content: data.moments[index].content,
                        photos: data.moments[index].photos ? JSON.parse(data.moments[index].photos) : [],
                        age: (0, moment_1.default)().diff(data.moments[index].birthday, 'years'),
                        data_type: 'moment',
                        like: like && like.id ? true : false,
                        likeNum: (await Database_1.default.from('likes').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
                        commentNum: (await Database_1.default.from('comments').where({ relation_type_id: data.moments[index].id, type: 'moment', status: 1 }).count('* as total'))[0].total || 0,
                        ip: geoip_lite_1.default.lookup(data.moments[index].ip),
                        created_at: (0, moment_1.default)(data.moments[index].created_at).format('YYYY-MM-DD')
                    });
                }
                if (data.answer.length && data.answer[index]) {
                    const like = await Database_1.default.from('likes').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1, user_id: session.get('user_id') || '' }).first();
                    const question = await Database_1.default.from('questions').select('title').where('id', data.answer[index].relation_question_id).first() || {};
                    descovery.push({
                        id: data.answer[index].id,
                        recommend: data.answer[index].recommend,
                        user_id: data.answer[index].user_id,
                        nickname: data.answer[index].nickname,
                        avatar_url: data.answer[index].avatar_url,
                        sex: data.answer[index].sex,
                        title: question.title || '',
                        content: data.answer[index].content,
                        photos: data.answer[index].photos ? JSON.parse(data.answer[index].photos) : [],
                        age: (0, moment_1.default)().diff(data.answer[index].birthday, 'years'),
                        data_type: 'answer',
                        like: like && like.id ? true : false,
                        likeNum: (await Database_1.default.from('likes').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
                        commentNum: (await Database_1.default.from('comments').where({ relation_type_id: data.answer[index].id, type: 'answer', status: 1 }).count('* as total'))[0].total || 0,
                        ip: geoip_lite_1.default.lookup(data.answer[index].ip),
                        created_at: (0, moment_1.default)(data.answer[index].created_at).format('YYYY-MM-DD')
                    });
                }
            }
            return view.render('admin/event/descovery', {
                data: {
                    title: '论坛',
                    subtitle,
                    active: 'descovery',
                    descovery
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