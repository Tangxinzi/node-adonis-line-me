"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const axios_1 = __importDefault(require("axios"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
const randomstring_1 = __importDefault(require("randomstring"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const zpData = require('../lib/Zhipin');
const Avatar = require('../lib/Avatar');
const { percentUserinfo } = require('../lib/Percent');
const { jscode2session } = require('../lib/Weixin');
const Verification = require('../lib/Verification');
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
    async wxaLogin({ request }) {
        try {
            const all = request.all();
            const result = await jscode2session(all.code);
            result.user = await Database_1.default.from('users').where('wechat_open_id', result.openid).first() || {};
            if (!result.user.id) {
                const id = await Database_1.default.table('users').returning('id').insert({
                    user_id: 'hl_a' + randomstring_1.default.generate({ length: 8, charset: ['numeric'] }),
                    wechat_open_id: result.openid,
                });
                result.user.id = id[0];
            }
            delete result.session_key;
            result.user.sign = await Jwt_1.default.signPrivateKey(result.user.id);
            return result;
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async getUserinfo({ request, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', session.get('user_id')).first();
            if (user) {
                const _geoip = geoip_lite_1.default.lookup(request.ip()) || {};
                await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ online_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip(), ip_city: _geoip.city });
                user.photos = JSON.parse(user.photos);
                user.location = user.location ? JSON.parse(user.location) : '';
                user.videos = JSON.parse(user.videos);
                user.zodiac_sign = this.getZodiacSign((0, moment_1.default)(user.birthday).format('DD'), (0, moment_1.default)(user.birthday).format('MM'));
                user.age = (0, moment_1.default)().diff(user.birthday, 'years');
                user.operates = await Database_1.default.from('users_operates').where({ user_id: session.get('user_id'), type: 'examine' }).first() ? true : false;
                user['work'] = JSON.parse(user['work']);
                if (user['work'] && user['work']['value']) {
                    user['work']['text'] = await zpData.data(user['work']['value'][0], user['work']['value'][1]);
                }
                user['number'] = {
                    message: 0,
                    introduction: (await Database_1.default.from('answer').where({ type: 1, status: 1, user_id: session.get('user_id') }).count('* as total'))[0].total,
                    visitor: 0,
                    moment: (await Database_1.default.from('moments').where('user_id', session.get('user_id')).count('* as total'))[0].total,
                    answer: (await Database_1.default.from('answer').where({ type: 0, status: 1, user_id: session.get('user_id') }).count('* as total'))[0].total,
                    customer: (await Database_1.default.from('customer').where({ status: 1, user_id: session.get('user_id') }).count('* as total'))[0].total,
                };
                if (user.ip) {
                    await (0, axios_1.default)({
                        url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${request.ip()}&json=true`,
                        responseType: "arraybuffer"
                    }).then(function (response) {
                        const data = iconv_lite_1.default.decode(response.data, 'gbk');
                        user.ip = data ? JSON.parse(data) : '';
                    }).catch(function (error) {
                    });
                }
            }
            user.percent = await percentUserinfo(session.get('user_id'));
            return user;
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            return error;
        }
    }
    async review({ params, request, response, session }) {
        try {
            const all = request.all();
            const verify = await Database_1.default.from('verification').where({ user_id: session.get('user_id'), table: params.table, field: params.field, is_verified: 0, verification_status: 'pending' }).first();
            response.json({ status: 200, message: "ok", data: verify });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            return error;
        }
    }
    async verification({ request, response, session }) {
        try {
            const all = request.all(), operates = await Database_1.default.from('users_operates').where({ user_id: session.get('user_id'), type: 'examine' }).first() ? true : false;
            if (operates) {
                var verify = await Database_1.default.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20);
                for (let index = 0; index < verify.length; index++) {
                    verify[index].userinfo = await Database_1.default.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].user_id }).first();
                    verify[index].checker = await Database_1.default.from('users').select('avatar_url', 'nickname').where({ user_id: verify[index].verification_user_id }).first() || {};
                    verify[index].verification_status = verify[index].verification_status.toUpperCase();
                    verify[index].created_at = (0, moment_1.default)(verify[index].created_at).fromNow();
                    verify[index].modified_at = verify[index].modified_at ? (0, moment_1.default)(verify[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : '';
                    switch (`${verify[index].table}.${verify[index].field}`) {
                        case 'users.avatar_url':
                            verify[index].table = '用户信息';
                            verify[index].value = '头像';
                            break;
                        case 'users.photos':
                            verify[index].table = '用户信息';
                            verify[index].value = '照片集';
                            break;
                    }
                }
            }
            response.json({
                status: 200,
                message: "ok",
                data: {
                    verify,
                    operates,
                    pending: (await Database_1.default.from('verification').where({ is_verified: 0, verification_status: 'pending' }).count('* as total'))[0].total
                }
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async updateUserinfo({ request, session }) {
        try {
            const all = request.all();
            return Database_1.default.from('users').where('user_id', session.get('user_id')).update({
                type: all.type,
                nickname: all.nickname,
                avatar_url: all.avatar_url || Avatar.data(all.sex),
                work: JSON.stringify(all.work),
                height: all.height,
                sex: all.sex,
                birthday: all.birthday,
                photos: JSON.stringify(all.photos || []),
                ip: request.ip(),
                modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
            }, ['id']);
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    compareArrays(before, after) {
        const changes = { modified: [], added: [], deleted: [] };
        before.forEach((item, index) => {
            if (after[index] !== item) {
                changes.modified.push({ index, before: item, after: after[index] });
            }
        });
        after.slice(before.length).forEach((item, index) => {
            changes.added.push({ index: index + before.length, item });
        });
        before.slice(after.length).forEach((item, index) => {
            changes.deleted.push({ index: index + after.length, item });
        });
        return changes;
    }
    async updateUserField({ request, response, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', session.get('user_id')).first() || {};
            switch (all.type) {
                case 'avatar_url':
                    await Verification.regularData({
                        user_id: session.get('user_id'),
                        table: 'users',
                        field: 'avatar_url',
                        before: user.avatar_url,
                        value: all.value,
                        ip: request.ip()
                    });
                    break;
                case 'nickname':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ nickname: all.value });
                    break;
                case 'birthday':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value });
                    break;
                case 'height':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ height: all.value });
                    break;
                case 'work':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ work: JSON.stringify(all.value || '') });
                    break;
                case 'birthday':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value });
                    break;
                case 'detail':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ detail: all.value });
                    break;
                case 'phone':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ phone: all.value });
                    break;
                case 'photos':
                    const changes = this.compareArrays(JSON.parse(user.photos), all.value);
                    if (changes.added.length) {
                        await Verification.regularData({
                            user_id: session.get('user_id'),
                            table: 'users',
                            field: 'photos',
                            before: user.photos,
                            value: JSON.stringify(all.value),
                            ip: request.ip()
                        });
                    }
                    else {
                        await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ photos: JSON.stringify(all.value || []) });
                    }
                    break;
                case 'videos':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ videos: JSON.stringify(all.value || []) });
                    break;
                case 'school':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ school: all.value });
                    break;
                case 'company':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ company: all.value });
                    break;
                case 'location':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ location: JSON.stringify(all.value || []) });
                    break;
                case 'salary':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ salary: all.value });
                    break;
            }
            response.json({
                status: 200,
                message: "ok"
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "ok",
                data: error
            });
        }
    }
    async changeType({ request, response, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', session.get('user_id')).first();
            if (user) {
                await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ type: user.type == 1 ? 2 : 1 });
                response.json({
                    status: 200,
                    message: "ok"
                });
            }
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async chat({ request, response, session }) {
        try {
            const all = request.all();
            if (all.type == 'customer') {
                const customer = await Database_1.default.from('customer').where('id', all.customer_id).first() || await Database_1.default.from('users').where('user_id', all.customer_id).first();
                const chatroom_left = await Database_1.default.from('chatroom').where('chat_users_id', `${customer.user_id},${session.get('user_id')}`).first();
                const chatroom_right = await Database_1.default.from('chatroom').where('chat_users_id', `${session.get('user_id')},${customer.user_id}`).first();
                const chatroom = chatroom_left || chatroom_right;
                if (session.get('user_id') == customer.user_id) {
                    return response.json({
                        status: 500,
                        message: "internalServerError",
                        data: 'Unable to chat with oneself'
                    });
                }
                if (chatroom) {
                    response.json({
                        status: 200,
                        message: "ok",
                        data: {
                            chat_id: chatroom.chat_id
                        }
                    });
                }
                else {
                    const chat_id = (0, uuid_1.v4)();
                    const id = await Database_1.default.table('chatroom').insert({ chat_id, chat_users_id: `${session.get('user_id')},${customer.user_id}` }).returning('chat_id');
                    await Database_1.default.table('chats').insert({
                        chat_id,
                        user_id: session.get('user_id'),
                        chat_content: all.customer_id,
                        chat_content_type: 'customer',
                        chat_ip: request.ip()
                    });
                    response.json({
                        status: 200,
                        message: "ok",
                        data: {
                            chat_id
                        }
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async location({ request, session }) {
        try {
            const all = request.all();
            const location = await Database_1.default.from('users_location').where('user_id', session.get('user_id')).first() || {};
            if (location.id) {
                await Database_1.default.from('users_location').where('user_id', session.get('user_id')).update({ longitude: all.longitude, latitude: all.latitude });
            }
            else {
                await Database_1.default.table('users_location').insert({ user_id: session.get('user_id'), longitude: all.longitude, latitude: all.latitude, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            return all;
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async qrcode({ request, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', session.get('user_id')).first();
            const QrCode = require('qrcode');
            return await QrCode.toDataURL(await Jwt_1.default.signPrivateKey(user.id), { width: 180 });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map