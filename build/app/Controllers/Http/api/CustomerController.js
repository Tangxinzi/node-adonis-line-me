"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const axios_1 = __importDefault(require("axios"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const Avatar = require('../lib/Avatar');
const zpData = require('../lib/Zhipin');
const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const Weixin = require('../lib/Weixin');
const Verification = require('../lib/Verification');
const RELATION = ["朋友", "闺蜜", "亲戚", "同学", "同事", "其他"];
const SALARY_RANGE = [
    { index: 0, value: '5w 以内' },
    { index: 1, value: '5 - 10w' },
    { index: 2, value: '10 - 20w' },
    { index: 3, value: '20 - 30w' },
    { index: 4, value: '30 - 50w' },
    { index: 5, value: '50 - 100w' },
    { index: 6, value: '100w 以上' }
];
class CustomerController {
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
    async customerFormat(customer, session) {
        for (let index = 0; index < customer.length; index++) {
            if (customer[index].relation_log_id) {
                customer[index] = {
                    ...customer[index],
                    ...await Database_1.default.from('customer_log').select('*').where('id', customer[index].relation_log_id).first(),
                    parent: await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first()
                };
            }
            if (customer[index].relation_user_id) {
                customer[index] = {
                    ...customer[index],
                    ...await Database_1.default.from('users').select('*').where('user_id', customer[index].relation_user_id).first(),
                    parent: await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].relation_user_id).first()
                };
            }
            customer[index].like = await Database_1.default.from('likes').select('id').where({ status: 1, type: 'customer', relation_type_id: customer[index].cid, user_id: session.get('user_id') }).first() || {};
            customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : [];
            customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : [];
            customer[index]['zodiac_sign'] = this.getZodiacSign((0, moment_1.default)(customer[index]['birthday']).format('DD'), (0, moment_1.default)(customer[index]['birthday']).format('MM'));
            customer[index]['age'] = (0, moment_1.default)().diff(customer[index]['birthday'], 'years');
            customer[index].relation = RELATION[customer[index].relation];
            customer[index].salary = customer[index].salary ? SALARY_RANGE[customer[index].salary].value : '';
            customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : [];
            if (customer[index]['work']['value']) {
                customer[index]['work']['text'] = await zpData.data(customer[index]['work']['value'][0], customer[index]['work']['value'][1]);
            }
            if (customer[index].relation_wechat_open_id) {
                let _answer = [[], [], []];
                const answer = (await Database_1.default.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.user_id = :user_id order by type asc;", {
                    user_id: customer[index].relation_user_id
                }))[0];
                for (let index = 0; index < answer.length; index++) {
                    switch (answer[index].type) {
                        case '0':
                            _answer[0].push(answer[index]);
                            break;
                        case '1':
                            _answer[1].push(answer[index]);
                            break;
                        case '2':
                            _answer[2].push(answer[index]);
                            break;
                    }
                }
                customer[index].answer = _answer;
            }
            if (customer[index].ip) {
                await (0, axios_1.default)({
                    url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${customer[index].ip}&json=true`,
                    responseType: "arraybuffer"
                }).then((response) => {
                    const data = iconv_lite_1.default.decode(response.data, 'gbk');
                    customer[index].ip = data ? JSON.parse(data) : '';
                }).catch((error) => {
                });
            }
        }
        return customer;
    }
    async filter({ params, response, request, session }) {
        try {
            let all = request.all(), data = [];
            switch (params.type) {
                case 2:
                case '2':
                    data = await Database_1.default.from('users').where({ type: 2, status: 1 }).orderBy('id', 'desc').forPage(request.input('page', 1), 10);
                    for (let index = 0; index < data.length; index++) {
                        data[index].customer_num = (await Database_1.default.from('customer').where({ user_id: data[index].user_id, status: 1 }).count('* as total'))[0].total;
                        data[index].work = JSON.parse(data[index].work);
                        if (data[index].work && data[index].work['value']) {
                            data[index].work.text = await zpData.data(data[index].work['value'][0], data[index].work['value'][1]);
                        }
                    }
                    break;
                case 'distance':
                    const location = await Database_1.default.from('users_location').where('user_id', session.get('user_id')).first();
                    const distance = await Database_1.default.rawQuery(`SELECT user_id, latitude, longitude, ST_DISTANCE_SPHERE(point(longitude, latitude), point(${location.longitude}, ${location.latitude})) AS distance FROM users_location WHERE user_id != '${session.get('user_id')}' ORDER BY distance;`);
                    let database = [];
                    for (let index = 0; index < distance[0].length; index++)
                        database[index] = distance[0][index].user_id;
                    const customer = await Database_1.default.from('customer').select('id as cid', 'user_id', 'introduction', 'relation', 'relation_log_id', 'relation_user_id').where({ status: 1, recommend: 1 }).whereIn('user_id', database).orderBy('recommend_at', 'desc').limit(10);
                    data = await this.customerFormat(customer, session);
                    for (let index = 0; index < location.length; index++) {
                        for (let j = 0; j < data.length; j++) {
                            if (distance[0][index].user_id == data[j].user_id) {
                                data[j].distance = location[index].distance;
                            }
                        }
                    }
                    break;
            }
            return response.json({ status: 200, message: "ok", data });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
    async relationCustomerinfo({ request, response, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where('user_id', all.userinfo.user_id).first() || {};
            if (user.user_id == session.get('user_id')) {
                return response.json({ status: 200, sms: "error", data: '关联失败，不能成为自己的介绍人哦。' });
            }
            const customer = await Database_1.default.from('customer').where({ user_id: session.get('user_id'), relation_user_id: user.user_id }).first() || {};
            if (customer.id) {
                return response.json({ status: 200, sms: "error", data: '当前用户已被关联，请被解除后再进行操作。' });
            }
            else {
                const id = await Database_1.default.table('customer').returning('id').insert({
                    status: 1,
                    user_id: session.get('user_id'),
                    relation: all.relation || '',
                    relation_user_id: user.user_id || '',
                    introduction: all.introduction,
                    userinfo: JSON.stringify(all.userinfo)
                });
                return response.json({ status: 200, sms: "ok" });
            }
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
    async customerInfo({ params, request, response }) {
        try {
            const all = request.all();
            let customer = await Database_1.default.from('customer').select('id', 'user_id', 'introduction', 'relation_log_id', 'relation_user_id').whereIn('status', [1, 2]).where({ id: params.id }).first();
            if (customer.relation_log_id) {
                customer = {
                    ...customer,
                    ...await Database_1.default.from('customer_log').select('*').where('id', customer.relation_log_id).first()
                };
            }
            if (customer.relation_user_id) {
                customer = {
                    ...customer,
                    ...await Database_1.default.from('users').select('avatar_url', 'nickname', 'detail').where('user_id', customer.relation_user_id).first()
                };
            }
            response.json({
                status: 200,
                sms: "ok",
                data: customer
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
    async verifyPhone({ session, request, response }) {
        try {
            const all = request.all();
            const userPhone = (await Database_1.default.from('users').where({ phone: all.phone }).count('* as total'))[0].total, customerPhone = (await Database_1.default.from('customer').where({ verify_phone: all.phone }).count('* as total'))[0].total;
            if (userPhone || customerPhone) {
                return response.json({ status: 200, message: "error", data: '您验证的手机号当前被占用' });
            }
            let sms = await Database_1.default.from('sms').where({ code: all.code, phone: all.phone, user_id: session.get('user_id') }).orderBy('created_at', 'desc').first();
            if (sms) {
                const seconds = (0, moment_1.default)().diff(sms.created_at, 'seconds');
                if (seconds > 300) {
                    return response.json({ status: 200, message: "timeout", data: '当前验证码已失效' });
                }
                else {
                    const customer = await Database_1.default.from('customer').where({ relation_log_id: all.id, user_id: session.get('user_id') }).first();
                    if (customer.id) {
                        const result = await Database_1.default.from('customer').where({ id: customer.id }).update({ verify_phone: all.phone });
                        return response.json({ status: 200, message: "ok", data: '已验证' });
                    }
                }
            }
            else {
                return response.json({ status: 200, message: "error", data: '手机号或者验证码填写错误' });
            }
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                messages: "internalServerError",
                data: JSON.stringify(error)
            });
        }
    }
    async createCustomerinfo({ request, response, session }) {
        try {
            const all = request.all();
            const relation_log_id = await Database_1.default.table('customer_log').returning('id').insert({
                nickname: all.nickname || '',
                avatar_url: all.avatar_url || '',
                birthday: all.birthday || '',
                height: all.height || 0,
                sex: all.sex || 0,
                work: JSON.stringify(all.work || ''),
                photos: JSON.stringify(all.photos || [])
            });
            const customer_id = await Database_1.default.table('customer').insert({
                status: 2,
                user_id: session.get('user_id'),
                relation_log_id: relation_log_id,
                relation: all.relation,
                introduction: all.introduction || '',
                userinfo: JSON.stringify(all)
            });
            const status = await Database_1.default.from('users_operates').where({ 'user_id': session.get('user_id'), status: 1 }).where('type', 'like', '%inspire%').first() || {};
            if (status.id) {
                await Database_1.default.table('users_operates_log').insert({
                    status: 2,
                    user_id: session.get('user_id'),
                    customer_id: customer_id,
                    customer_log_id: relation_log_id,
                    price: status.price
                });
            }
            return response.json({
                status: 200,
                sms: "ok",
                data: customer_id[0]
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "ok",
                data: error
            });
        }
    }
    async customerList({ request, response, session }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'sex', 'detail', 'school', 'company', 'work', 'job_title').where('user_id', all.user_id || session.get('user_id')).first();
            user.work = user.work ? JSON.parse(user.work) : [];
            if (user.work.value) {
                user.work.text = await zpData.data(user.work.value[0], user.work.value[1]);
            }
            const authentication = await Database_1.default.from('authentication').select('idcard', 'school', 'company', 'work', 'job_title', 'salary').where({ user_id: all.user_id || session.get('user_id') }).first() || {};
            if (authentication.company && authentication.idcard && authentication.job_title && authentication.salary && authentication.school && authentication.work) {
                user.authentication = true;
            }
            else {
                user.authentication = false;
            }
            const customer = await Database_1.default.from('customer').select('id', 'user_id', 'relation', 'introduction', 'relation_log_id', 'relation_user_id', 'status', 'created_at').whereIn('status', all.status ? all.status.split(',') : [1, 2]).where('user_id', all.user_id || session.get('user_id')).orderBy('created_at', 'desc');
            for (let index = 0; index < customer.length; index++) {
                if (customer[index].relation_user_id) {
                    customer[index] = {
                        ...customer[index],
                        percent: await percentUserinfo(customer[index].relation_user_id),
                        ...await Database_1.default.from('users').select('avatar_url', 'nickname', 'sex', 'work', 'company', 'birthday', 'phone', 'photos', 'location').where('user_id', customer[index].relation_user_id).first()
                    };
                }
                else if (customer[index].relation_log_id) {
                    customer[index] = {
                        ...customer[index],
                        percent: await percentCustomerinfo(customer[index].relation_log_id),
                        ...await Database_1.default.from('customer_log').select('avatar_url', 'nickname', 'sex', 'work', 'company', 'birthday', 'phone', 'photos', 'location').where('id', customer[index].relation_log_id).first()
                    };
                }
                customer[index].introduces = await Database_1.default.from('answer').select('introduce_name', 'content').where({ type: 1, status: 1, user_id: customer[index].user_id }).orderBy('created_at', 'desc');
                customer[index].age = (0, moment_1.default)().diff(customer[index].birthday, 'years');
                customer[index].photos = customer[index].photos ? JSON.parse(customer[index].photos) : [];
                customer[index].location = customer[index].location ? JSON.parse(customer[index].location) : [];
                customer[index].relation = RELATION[customer[index].relation];
                customer[index].work = customer[index].work ? JSON.parse(customer[index].work) : [];
                if (customer[index].work.value) {
                    customer[index].work.text = await zpData.data(customer[index].work.value[0], customer[index].work.value[1]);
                }
                customer[index].created_at = (0, moment_1.default)(customer[index].created_at).format('YYYY-MM-DD');
            }
            response.json({
                status: 200,
                sms: "ok",
                data: {
                    user,
                    customer
                }
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: {
                    user: {},
                    customer: []
                }
            });
        }
    }
    async customerShow({ params, request, response, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').select('id as cid', 'status', 'user_id', 'relation_user_id', 'recommend', 'relation', 'verify_phone', 'relation_log_id', 'introduction').where({ 'id': params.id }).first() || {};
            if (customer.verify_phone) {
                if (/^1[0-9]{10}$/.test(customer.verify_phone)) {
                    customer.verify_phone = customer.verify_phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                }
                else {
                    customer.verify_phone = "手机号格式不正确";
                }
            }
            customer.relation_text = RELATION[customer.relation];
            if (customer.relation_log_id) {
                customer.percent = await percentCustomerinfo(customer.relation_log_id),
                    customer.userinfo = await Database_1.default.from('customer_log').select('*').where({ 'id': customer.relation_log_id }).first();
            }
            else if (customer.relation_user_id) {
                customer.percent = await percentUserinfo(customer.relation_user_id),
                    customer.userinfo = await Database_1.default.from('users').select('*').where({ 'user_id': customer.relation_user_id }).first();
            }
            customer.parent = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'company', 'job_title').where('user_id', customer.user_id).first();
            if (customer.parent.company) {
                customer.parent.company = customer.parent.company.length > 10 ? customer.parent.company.substr(0, 10) + '...' : customer.parent.company;
            }
            customer.introduces = await Database_1.default.from('answer').where({ type: 1, status: 1, recommend: 1, user_id: customer.relation_user_id });
            customer.userinfo.location = customer.userinfo.location ? JSON.parse(customer.userinfo.location) : '';
            customer.userinfo.age = (0, moment_1.default)().diff(customer.userinfo.birthday, 'years');
            customer.userinfo.zodiac_sign = this.getZodiacSign((0, moment_1.default)(customer.userinfo.birthday).format('DD'), (0, moment_1.default)(customer.userinfo.birthday).format('MM'));
            customer.userinfo.photos = customer.userinfo.photos ? JSON.parse(customer.userinfo.photos) : [];
            customer.userinfo.work = customer.userinfo.work ? JSON.parse(customer.userinfo.work) : [];
            if (customer.userinfo.work.value) {
                customer.userinfo.work.text = await zpData.data(customer.userinfo.work.value[0], customer.userinfo.work.value[1]);
            }
            customer.userinfo.created_at = (0, moment_1.default)(customer.userinfo.created_at).format('YYYY-MM-DD');
            customer.userinfo.modified_at = (0, moment_1.default)(customer.userinfo.modified_at).format('YYYY-MM-DD');
            customer.like = await Database_1.default.from('likes').select('id').where({ status: 1, type: 'customer', relation_type_id: customer.cid, user_id: all.user_id || session.get('user_id') || '' }).first() || {};
            if (all.type == 'share') {
                customer.wxacode = `/uploads/wxacode/customer-${customer.cid}.png`;
                fs_1.default.access(Application_1.default.publicPath(customer.wxacode), fs_1.default.constants.F_OK, async (err) => {
                    if (err) {
                        await Weixin.getWxacode({
                            filename: 'customer-' + customer.cid,
                            path: 'pages/user-info-detail/user-info-detail?source=share&id=' + customer.cid,
                        });
                    }
                });
                customer.urllink = await Weixin.generateUrllink({
                    path: 'pages/user-info-detail/user-info-detail?id=' + customer.cid,
                });
                customer.shortlink = await Weixin.genwxaShortlink({
                    path: 'pages/user-info-detail/user-info-detail?id=' + customer.cid,
                });
            }
            if ((all.user_id || session.get('user_id')) == customer.user_id) {
                const review = await Database_1.default.from('datas').where({ status: 1, category: 0, table: 'customer', field_value: customer.cid }).count('* as total');
                const shareReview = await Database_1.default.from('datas').where({ status: 1, category: 2, table: 'customer', field_value: customer.cid }).count('* as total');
                const like = await Database_1.default.from('likes').where({ status: 1, type: 'customer', relation_type_id: customer.cid }).count('* as total');
                const timer = await Database_1.default.from('datas').where({ status: 1, category: 1, table: 'customer', field_value: customer.cid }).sum('count as sum');
                const timerCounter = await Database_1.default.from('datas').distinct('user_id').where({ status: 1, category: 1, table: 'customer', field_value: customer.cid });
                customer.datas = {
                    review: review[0].total,
                    shareReview: shareReview[0].total,
                    like: like[0].total,
                    timer: parseInt(timer[0].sum / timerCounter.length) || 0,
                };
            }
            response.json({ status: 200, sms: "ok", data: customer });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
    async updateCustomerField({ params, request, response, session }) {
        try {
            const all = request.all();
            let customer = await Database_1.default.from('customer').where({ id: params.id, user_id: session.get('user_id') }).first();
            switch (`${all.type}.${all.field}`) {
                case 'customer.relation':
                    var result = await Database_1.default.from('customer').where({ id: params.id, user_id: session.get('user_id') }).update({ relation: all.value });
                    break;
                case 'customer.introduction':
                    var result = await Database_1.default.from('customer').where({ id: params.id, user_id: session.get('user_id') }).update({ introduction: all.value });
                    break;
                case 'userinfo.nickname':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ nickname: all.value });
                    break;
                case 'userinfo.avatar_url':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ avatar_url: all.value });
                    break;
                case 'userinfo.contact_wechat':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ contact_wechat: all.value.contact_wechat, contact_wechat_show: all.value.contact_wechat_show });
                    break;
                case 'userinfo.photos':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ photos: JSON.stringify(all.value) });
                    break;
                case 'userinfo.work':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ work: JSON.stringify(all.value) });
                    break;
                case 'userinfo.job_title':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ job_title: all.value });
                    break;
                case 'userinfo.height':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ height: all.value });
                    break;
                case 'userinfo.weight':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ weight: all.value });
                    break;
                case 'userinfo.birthday':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ birthday: all.value });
                    break;
                case 'userinfo.location':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ location: JSON.stringify(all.value) });
                    break;
                case 'userinfo.school':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ school: all.value.school, education: all.value.education });
                    break;
                case 'userinfo.company':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ company: all.value });
                    break;
                case 'userinfo.salary':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ salary: all.value });
                    break;
                case 'userinfo.sex':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ sex: all.value });
                    break;
                case 'userinfo.mbti':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ mbti: all.value });
                    break;
                case 'userinfo.expectation':
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ expectation: all.value });
                    break;
            }
            response.json({
                status: 200,
                sms: "ok",
                data: result
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "ok",
                data: error
            });
        }
    }
    async phoneUpdateCustomerData({ params, request, response, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').where({ id: all.id, verify_phone: params.phone }).first() || {};
            await Database_1.default.from('customer_log').where('phone', params.phone).update({
                phone: all.phone || '',
                nickname: all.nickname || '',
                avatar_url: all.avatar_url || '',
                photos: JSON.stringify(all.photos || []),
                contact_wechat: all.contact_wechat || '',
                expectation: all.expectation || '',
                birthday: all.birthday || '',
                height: all.height,
                weight: all.weight,
                work: JSON.stringify(all.work),
                location: all.location,
                school: all.school,
                company: all.company,
                salary: all.salary,
                sex: all.sex,
                ip: request.ip(),
                modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
            });
            return response.json({ status: 200, sms: "ok" });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({ status: 500, sms: "internalServerError", data: error });
        }
    }
    async statusCustomer({ params, request, response, session }) {
        try {
            const all = request.all();
            if (params.status == 'public') {
                const customer = await Database_1.default.from('customer').where({ 'id': params.id, user_id: session.get('user_id') }).first();
                await Database_1.default.from('customer').where({ 'id': params.id, user_id: session.get('user_id') }).update({
                    status: 1,
                    modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                });
                await Verification.regularData({
                    user_id: session.get('user_id'),
                    table: 'customer',
                    field: '',
                    before: '',
                    value: JSON.stringify({
                        user_id: session.get('user_id'),
                        customer_id: customer.id,
                        relation_log_id: customer.relation_log_id,
                    }),
                    ip: request.ip()
                });
            }
            if (params.status == 'delete') {
                await Database_1.default.from('customer').where({ 'id': params.id, user_id: session.get('user_id') }).update({
                    status: 0,
                    deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                }, ['id']);
            }
            response.json({
                status: 200,
                sms: "ok"
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
    async introduceLabels({ request, response, session }) {
        try {
            return response.json({
                status: 200,
                sms: "ok",
                data: {
                    step_1: await Database_1.default.from('labels').select('id', 'name').whereIn('type', [1]).where('status', 1).orderBy('sort', 'asc'),
                    step_2: await Database_1.default.from('labels').select('id', 'name').whereIn('type', [2]).where('status', 1).orderBy('sort', 'asc'),
                }
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
    async introduceGenerate({ request, response, session }) {
        try {
            const tags = request.all();
            const activities = [
                tags[0].map(tag => `${tag}`).join("，"),
                tags[1].map(tag => `${tag}`).join("，")
            ];
            const description = [
                `在我眼中是一个${activities[0]}的人。`,
                `并且日常喜欢${activities[1]}。`,
            ];
            return response.json({
                status: 200,
                sms: "ok",
                data: description
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                sms: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = CustomerController;
//# sourceMappingURL=CustomerController.js.map