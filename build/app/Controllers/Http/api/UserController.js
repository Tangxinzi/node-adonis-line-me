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
const qrcode_1 = __importDefault(require("qrcode"));
const zpData = require('../lib/Zhipin');
const Avatar = require('../lib/Avatar');
const { percentUserinfo } = require('../lib/Percent');
const { jscode2session } = require('../lib/Weixin');
const Verification = require('../lib/Verification');
const Messages = require('../lib/Messages');
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
                const user_id = 'pie_a' + randomstring_1.default.generate({ length: 8, charset: ['numeric'] });
                const id = await Database_1.default.table('users').returning('id').insert({ user_id, wechat_open_id: result.openid });
                result.user.id = id[0];
                await Messages.push({ user_id, content: '相亲交友找对象，熟人介绍更靠谱。欢迎使用体验，如您在体验中遇任何问题请与管理员联系。' });
            }
            delete result.session_key;
            result.user.percent = await percentUserinfo(result.user.user_id);
            result.user.sign = await Jwt_1.default.signPrivateKey(result.user.id);
            const system = JSON.parse(all.system);
            await Database_1.default.from('users').where({ user_id: result.user.user_id }).update({ brand: system.brand, platform: system.platform, system: JSON.stringify(system) });
            return result;
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async phoneLogin({ request }) {
        try {
            const all = request.all();
            const result = {};
            result.user = await Database_1.default.from('users').where('phone', all.phone).first() || {};
            if (!result.user.id) {
                const user_id = 'pie_a' + randomstring_1.default.generate({ length: 8, charset: ['numeric'] });
                const id = await Database_1.default.table('users').returning('id').insert({ user_id, wechat_open_id: result.openid });
                result.user.id = id[0];
                await Messages.push({ user_id, content: '相亲交友找对象，熟人介绍更靠谱。欢迎使用体验，如您在体验中遇任何问题请与管理员联系。' });
            }
            result.user.percent = await percentUserinfo(result.user.user_id);
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
            const user_id = all.user_id || session.get('user_id') || '';
            const user = await Database_1.default.from('users').select('id', 'type', 'user_id', 'nickname', 'avatar_url', 'birthday', 'height', 'weight', 'sex', 'photos', 'videos', 'detail', 'expectation', 'contact_wechat', 'school', 'education', 'company', 'work', 'job_title', 'mbti', 'location', 'realname', 'salary', 'phone', 'parent_id', 'ip').where({ user_id }).first() || {};
            if (user) {
                user.percent = await percentUserinfo(user_id);
                const _geoip = geoip_lite_1.default.lookup(request.ip()) || {};
                await Database_1.default.from('users').where({ user_id }).update({ online_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip(), ip_city: _geoip.city });
                user.photos = user.photos ? JSON.parse(user.photos) : [];
                user.location = user.location ? JSON.parse(user.location) : '';
                user.videos = user.videos ? JSON.parse(user.videos) : [];
                user.zodiac_sign = this.getZodiacSign((0, moment_1.default)(user.birthday).format('DD'), (0, moment_1.default)(user.birthday).format('MM'));
                user.age = (0, moment_1.default)().diff(user.birthday, 'years');
                user.examine = await Database_1.default.from('users_operates').where({ user_id, status: 1 }).where('type', 'like', '%examine%').first() ? true : false;
                if (user.examine) {
                    user.verification_count = (await Database_1.default.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total;
                }
                else {
                    delete user.examine;
                }
                user.inspire = await Database_1.default.from('users_operates').where({ user_id, status: 1 }).where('type', 'like', '%inspire%').first() ? true : false;
                if (user.inspire) {
                    user.verification_count = (await Database_1.default.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total;
                }
                else {
                    delete user.inspire;
                }
                user.introduces = await Database_1.default.from('answer').select('introduce_name', 'content').where({ type: 1, status: 1, recommend: 1, user_id }).orderBy('created_at', 'desc');
                user.work = user.work ? JSON.parse(user.work) : {};
                if (user.work && user.work.value) {
                    user.work.text = await zpData.data(user.work.value[0], user.work.value[1]);
                }
                user['number'] = {
                    message: 0,
                    introduction: (await Database_1.default.from('answer').where({ type: 1, status: 1, user_id }).count('* as total'))[0].total,
                    like: (await Database_1.default.from('likes').where({ type: 'customer', status: 1, user_id }).count('* as total'))[0].total,
                    visitor: 0,
                    moment: (await Database_1.default.from('moments').where({ user_id }).count('* as total'))[0].total,
                    answer: (await Database_1.default.from('answer').where({ type: 0, status: 1, user_id }).count('* as total'))[0].total,
                    customer: (await Database_1.default.from('customer').where({ status: 1, relation_user_id: user_id }).count('* as total'))[0].total,
                    introducer: (await Database_1.default.from('customer').whereIn('status', [1, 2]).where({ user_id: user_id }).count('* as total'))[0].total,
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
            return user;
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", error);
            return {};
        }
    }
    watermark(mart) {
        try {
            const { createCanvas, loadImage } = require('canvas');
            const canvas = createCanvas(240, 100);
            const context = canvas.getContext('2d');
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#000000';
            context.font = '14px Arial';
            const text = `${mart} ${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`;
            context.save();
            context.rotate(-18 * Math.PI / 180);
            context.fillText(text, -10, 85);
            context.restore();
            const base64 = canvas.toDataURL('image/png');
            return base64;
        }
        catch (error) {
            console.log(error);
        }
    }
    async review({ params, response, session }) {
        try {
            const verify = await Database_1.default.from('verification').where({ user_id: session.get('user_id'), table: params.table, field: params.field, is_verified: 0, verification_status: 'pending' }).first();
            response.json({ status: 200, message: "ok", data: verify });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            return error;
        }
    }
    async findUser({ params, request, response, session }) {
        try {
            const all = request.all();
            switch (params.type) {
                case 'phone':
                    var user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where({ phone: all.value, status: 1 }).first() || {};
                    return response.json({ status: 200, message: "ok", data: user });
                    break;
                case 'wx_openid':
                    var user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where({ wechat_open_id: all.value, status: 1 }).first() || {};
                    return response.json({ status: 200, message: "ok", data: user });
                    break;
                case 'user_id':
                    var user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where({ user_id: all.value, status: 1 }).first() || {};
                    return response.json({ status: 200, message: "ok", data: user });
                    break;
            }
            return response.json({ status: 404, message: "ok", data: {} });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            return error;
        }
    }
    async verification({ request, response, session }) {
        try {
            const all = request.all(), operates = await Database_1.default.from('users_operates').where({ user_id: session.get('user_id') }).where('type', 'like', '%examine%').first() ? true : false;
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
                        case 'customer.':
                            verify[index].table = '介绍好友';
                            verify[index].value = JSON.parse(verify[index].value);
                            break;
                        case 'authentication_log.idcard':
                            verify[index].table = '认证审核';
                            verify[index].value = '用户身份';
                            break;
                        case 'authentication_log.school':
                            verify[index].table = '认证审核';
                            verify[index].value = '学校';
                            break;
                        case 'authentication_log.company':
                            verify[index].table = '认证审核';
                            verify[index].value = '公司';
                            break;
                        case 'authentication_log.work':
                            verify[index].table = '认证审核';
                            verify[index].value = '职业';
                            break;
                        case 'authentication_log.job_title':
                            verify[index].table = '认证审核';
                            verify[index].value = '职位';
                            break;
                        case 'authentication_log.salary':
                            verify[index].table = '认证审核';
                            verify[index].value = '薪资';
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
                    watermark: this.watermark(session.get('user_id')),
                    pending: (await Database_1.default.from('verification').where({ is_verified: 0, verification_status: 'pending' }).count('* as total'))[0].total
                }
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async authenticationVerification({ request, response, session }) {
        try {
            let all = request.all(), data = {};
            if (request.method() == 'POST') {
                const authentication = await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).first() || {};
                const authentication_log = await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).first() || {};
                if (!authentication.id && !authentication_log.id) {
                    await Database_1.default.table('authentication').insert({ user_id: session.get('user_id') });
                    switch (all.type) {
                        case 'idcard':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), idcard: all.value });
                            break;
                        case 'school':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), school: all.value });
                            break;
                        case 'company':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), company: all.value });
                            break;
                        case 'work':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), work: all.value });
                            break;
                        case 'job_title':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), job_title: all.value });
                            break;
                        case 'salary':
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), salary: all.value });
                            break;
                    }
                }
                switch (all.type) {
                    case 'idcard':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ idcard: all.value });
                        break;
                    case 'school':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ school: all.value });
                        break;
                    case 'company':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ company: all.value });
                        break;
                    case 'work':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ work: all.value });
                        break;
                    case 'job_title':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ job_title: all.value });
                        break;
                    case 'salary':
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ salary: all.value });
                        break;
                }
                await Verification.regularData({
                    user_id: session.get('user_id'),
                    table: 'authentication_log',
                    field: all.type,
                    before: '',
                    value: all.value,
                    ip: request.ip()
                });
            }
            if (request.method() == 'GET') {
                const authentication = await Database_1.default.from('authentication').where({ user_id: all.user_id || session.get('user_id') }).first() || {};
                const authentication_log = await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).first() || {};
                data = {
                    idcard: authentication.idcard == 1 ? 'approved' : (authentication_log.idcard ? 'pending' : ''),
                    school: authentication.school == 1 ? 'approved' : (authentication_log.school ? 'pending' : ''),
                    company: authentication.company == 1 ? 'approved' : (authentication_log.company ? 'pending' : ''),
                    work: authentication.work == 1 ? 'approved' : (authentication_log.work ? 'pending' : ''),
                    job_title: authentication.job_title == 1 ? 'approved' : (authentication_log.job_title ? 'pending' : ''),
                    salary: authentication.salary == 1 ? 'approved' : (authentication_log.salary ? 'pending' : ''),
                };
            }
            response.json({
                status: 200,
                message: "ok",
                data
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async updateUserinfo({ request, response, session }) {
        try {
            const all = request.all();
            await Database_1.default.from('users').where('user_id', session.get('user_id')).update({
                type: all.type,
                nickname: all.nickname,
                avatar_url: all.avatar_url || Avatar.data(all.sex || 0),
                school: all.school,
                company: all.company,
                job_title: all.job_title,
                work: JSON.stringify(all.work),
                work_code: all.work ? all.work.code : '',
                height: all.height,
                sex: all.sex,
                birthday: all.birthday,
                photos: JSON.stringify(all.photos || []),
                ip: request.ip(),
                modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
            }, ['id']);
            return response.json({
                status: 200,
                sms: "ok",
                data: session.get('user_id')
            });
        }
        catch (error) {
            console.log(error);
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
                case 'weight':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ weight: all.value });
                    break;
                case 'work':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ work: JSON.stringify(all.value || ''), work_code: all.value ? all.value.code : '' });
                    break;
                case 'birthday':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ birthday: all.value });
                    break;
                case 'detail':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ detail: all.value });
                    break;
                case 'expectation':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ expectation: all.value });
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
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ school: all.value.school, education: all.value.education });
                    break;
                case 'company':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ company: all.value });
                    break;
                case 'mbti':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ mbti: all.value });
                    break;
                case 'location':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ location: JSON.stringify(all.value || []) });
                    break;
                case 'job_title':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ job_title: all.value });
                    break;
                case 'salary':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ salary: all.value });
                    break;
                case 'contact_wechat':
                    await Database_1.default.from('users').where('user_id', session.get('user_id')).update({ contact_wechat: all.value });
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
    async recommendHome({ request, response, session }) {
        try {
            const all = request.all();
            const recommend = await Database_1.default.from('users_recommend').where('customer_id', all.customer_id).orWhere('customer_user_id', all.customer_user_id).first() || {};
            if (recommend.id) {
                const days = (0, moment_1.default)().diff(recommend.created_at, 'days');
                if (days < 2) {
                    return response.json({ status: 200, message: "ok", data: '该好友最近已被推荐过了哦' });
                }
                else {
                    await Database_1.default.from('users_recommend').where('customer_id', all.customer_id).orWhere('customer_user_id', all.customer_user_id).update({ status: 0, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                    return response.json({ status: 200, message: "ok", data: '已推荐' });
                }
            }
            else {
                const id = await Database_1.default.table('users_recommend').insert({ user_id: session.get('user_id'), customer_id: all.customer_id || '', customer_user_id: all.customer_user_id || '', detail: all.detail || '' }).returning('id');
                response.json({ status: 200, message: "ok", data: '已推荐' });
            }
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
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
                let customer = await Database_1.default.from('customer').select('id', 'user_id', 'introduction', 'relation_log_id', 'relation_user_id').whereIn('status', [1, 2]).where({ id: all.customer_id }).first() || {};
                if (customer.id) {
                    if (customer.relation_log_id) {
                        customer = {
                            ...customer,
                            ...await Database_1.default.from('customer_log').select('avatar_url', 'nickname', 'detail').where('id', customer.relation_log_id).first()
                        };
                    }
                    if (customer.relation_user_id) {
                        customer = {
                            ...customer,
                            ...await Database_1.default.from('users').select('avatar_url', 'nickname', 'detail').where('user_id', customer.relation_user_id).first()
                        };
                    }
                }
                const chatroom = await Database_1.default.from('chatroom').where('chat_users_id', `${customer.user_id},${session.get('user_id')}`).orWhere('chat_users_id', `${session.get('user_id')},${customer.user_id}`).where('status', 1).first() || {};
                if (session.get('user_id') == customer.user_id) {
                    return response.json({
                        status: 500,
                        message: "internalServerError",
                        data: 'Unable to chat with oneself'
                    });
                }
                if (chatroom.id) {
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: {
                            customer,
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
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: {
                            chat_id
                        }
                    });
                }
            }
            if (all.type == 'user') {
                if (session.get('user_id') == all.user_id) {
                    return response.json({
                        status: 500,
                        message: "internalServerError",
                        data: 'Unable to chat with oneself'
                    });
                }
                const chatroom = await Database_1.default.from('chatroom').where('chat_users_id', `${all.user_id},${session.get('user_id')}`).orWhere('chat_users_id', `${session.get('user_id')},${all.user_id}`).where('status', 1).first() || {};
                if (chatroom.id) {
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: {
                            chat_id: chatroom.chat_id
                        }
                    });
                }
                else {
                    const chat_id = (0, uuid_1.v4)();
                    const id = await Database_1.default.table('chatroom').insert({ chat_id, chat_users_id: `${session.get('user_id')},${all.user_id}` }).returning('chat_id');
                    return response.json({
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
    async chatSend({ request, response, session }) {
        try {
            const all = request.all();
            const id = await Database_1.default.table('chats').insert({ chat_id: all.chat_id, user_id: session.get('user_id'), chat_content: all.chat_content, chat_content_type: all.chat_content_type, chat_ip: request.ip() });
            await Database_1.default.from('chatroom').where({ chat_id: all.chat_id, status: 1 }).update({ modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            await Database_1.default.from('chats_log').where({ chat_id: all.chat_id, user_id: session.get('user_id') }).update({ last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            response.json({
                status: 200,
                message: "ok",
                data: id
            });
        }
        catch (error) {
            console.log(error);
            response.json({
                status: 500,
                message: "ok",
                data: error
            });
        }
    }
    async messages({ request, response, session }) {
        try {
            const all = request.all(), user_id = session.get('user_id');
            const messages = await Database_1.default.from('messages').where({ user_id, status: 1 }).orderBy('created_at', 'asc').forPage(request.input('page', 1), 20);
            const messages_log = await Database_1.default.from('messages_log').where({ user_id }).first() || {};
            if (messages_log.id) {
                await Database_1.default.from('messages_log').where({ user_id }).update({ last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            else {
                await Database_1.default.table('messages_log').insert({ user_id, last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            return response.json({
                status: 200,
                message: "ok",
                data: messages
            });
        }
        catch (error) {
            console.log(error);
            response.json({
                status: 500,
                message: "ok",
                data: error
            });
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
    async collection({ params, request, response, session }) {
        try {
            const like = await Database_1.default.from('likes').where({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id') }).first() || {};
            if (!like.id && params.type == 'customer') {
                await Database_1.default.table('likes').insert({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id'), ip: request.ip() });
            }
            else if (like.id && params.type == 'customer') {
                await Database_1.default.from('likes').where({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id') }).update({ status: !collection.status, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            return response.json({ status: 200, message: "ok" });
        }
        catch (error) {
            console.log(error);
        }
    }
    async qrcode({ request, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', session.get('user_id')).first();
            return await qrcode_1.default.toDataURL(await Jwt_1.default.signPrivateKey(user.id), { width: 180 });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map