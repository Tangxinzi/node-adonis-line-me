"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
const zpData = require('../lib/Zhipin'), mbti = {
    value: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'],
    text: ['建筑师', '逻辑学家', '指挥官', '辩论家', '提倡者', '调停者', '主人公', '竞选者', '物流师', '守卫者', '总经理', '执政官', '鉴赏家', '探险家', '企业家', '表演者'],
    image: [
        'https://www.16personalities.com/static/images/personality-types/avatars/intj-architect.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/intp-logician.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/entj-commander.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/entp-debater.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/infj-advocate.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/infp-mediator.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/enfj-protagonist.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/enfp-campaigner.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/istj-logistician.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/isfj-defender.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/estj-executive.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/esfj-consul.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/istp-virtuoso.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/isfp-adventurer.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/estp-entrepreneur.svg',
        'https://www.16personalities.com/static/images/personality-types/avatars/esfp-entertainer.svg'
    ]
};
class UserController {
    getZodiacSign(day, month) {
        const zodiacSigns = [
            '摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
            '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'
        ];
        const signDates = [
            { month: 1, day: 20 }, { month: 2, day: 19 }, { month: 3, day: 20 },
            { month: 4, day: 20 }, { month: 5, day: 21 }, { month: 6, day: 21 },
            { month: 7, day: 23 }, { month: 8, day: 23 }, { month: 9, day: 23 },
            { month: 10, day: 23 }, { month: 11, day: 22 }, { month: 12, day: 22 }
        ];
        let i = 0;
        while (i < signDates.length) {
            if (month < signDates[i].month || (month === signDates[i].month && day <= signDates[i].day)) {
                return zodiacSigns[i];
            }
            i++;
        }
        return zodiacSigns[0];
    }
    async share({ request, response, view, session }) {
        try {
            const all = request.all();
            let user = await Database_1.default.from('customer').select('id', 'user_id', 'relation_user_id', 'relation', 'relation_log_id', 'introduction').where({ id: all.id, status: 1 }).whereNull('deleted_at').orderBy('created_at').first() || {};
            if (user.relation_log_id) {
                user.parent = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'company', 'job_title').where('user_id', user.user_id).first() || {};
                user = {
                    ...user,
                    ...await Database_1.default.from('customer_log').select('nickname', 'avatar_url', 'sex', 'height', 'weight', 'photos', 'mbti', 'location', 'birthday', 'work').where({ id: user.relation_log_id }).first() || {}
                };
            }
            else if (user.relation_user_id) {
                user.parent = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'company', 'job_title').where('user_id', user.relation_user_id).first() || {};
                user = {
                    ...user,
                    ...await Database_1.default.from('users').select('nickname', 'avatar_url', 'sex', 'height', 'weight', 'photos', 'mbti', 'location', 'birthday', 'work').where({ user_id: user.relation_user_id }).first() || {}
                };
            }
            user.photos = user.photos ? JSON.parse(user.photos) : [];
            user.location = user.location ? JSON.parse(user.location) : '';
            user.zodiac_sign = this.getZodiacSign((0, moment_1.default)(user.birthday).format('DD'), (0, moment_1.default)(user.birthday).format('MM'));
            user.age = (0, moment_1.default)().diff(user.birthday, 'years');
            user.work = user.work ? JSON.parse(user.work) : {};
            if (user.work && user.work.value) {
                user.work.text = await zpData.data(user.work.value[0], user.work.value[1]);
            }
            user.mbti = user.mbti ? {
                text: mbti.text[user.mbti],
                image: mbti.image[user.mbti],
                value: mbti.value[user.mbti]
            } : null;
            return view.render('web/user/share', {
                data: {
                    title: '派 PIE',
                    user
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async incentiveLogin({ request, response, view, session }) {
        try {
            const all = request.all();
            console.log(all);
            return view.render('web/user/incentive-login', {
                data: {
                    title: '派 PIE'
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map