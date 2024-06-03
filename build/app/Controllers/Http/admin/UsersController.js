"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const node_ipinfo_1 = __importDefault(require("node-ipinfo"));
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
const zpData = require('../lib/Zhipin');
const { percentUserinfo } = require('../lib/Percent');
const ipinfoWrapper = new node_ipinfo_1.default("c175d8eff0ed76");
class UsersController {
    async login({ request, response, view, session }) {
        try {
            if (request.method() == 'POST') {
                const all = request.all();
                if ((all.phone == '17725386753' && all.password == '55555jkl.') || (all.phone == '13820548461' && all.password == '13820548461yx.')) {
                    const user = await Database_1.default.from('users').where({ phone: all.phone }).first() || {};
                    if (user.user_id) {
                        const sign = await Jwt_1.default.signPrivateKey(user.id);
                        session.put('adonis-cookie-sign', sign);
                        response.plainCookie('adonis-cookie-sign', { sign }, { httpOnly: false });
                        return response.redirect().status(301).toRoute('admin/CustomersController.index');
                    }
                    else {
                        console.log('login error');
                        return response.redirect().status(301).toRoute('admin/UsersController.login');
                    }
                }
                else {
                    session.clear();
                    session.forget('adonis-cookie-sign');
                    response.clearCookie('adonis-cookie-sign');
                    return view.render('admin/user/login', {
                        data: {
                            title: '登录'
                        }
                    });
                }
            }
            else {
                session.forget('adonis-cookie-sign');
                response.clearCookie('adonis-cookie-sign');
                return view.render('admin/user/login', {
                    data: {
                        title: '登录'
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async index({ request, view, session }) {
        try {
            const all = request.all();
            const ips = ['10.0.8.12', '10.0.8.14', '10.0.8.14'];
            const users = await Database_1.default.from('users').whereIn('type', all.type ? all.type.split(',') : [1, 2]).orderBy(all.orderBy || 'id', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < users.length; index++) {
                users[index].work = JSON.parse(users[index].work);
                if (users[index].work && users[index].work['value']) {
                    users[index].work.text = await zpData.data(users[index].work['value'][0], users[index].work['value'][1]);
                }
                let authentication = await Database_1.default.from('authentication').select('idcard', 'school', 'company', 'work', 'job_title', 'salary').where({ user_id: users[index].user_id || session.get('user_id') }).first() || {};
                if (authentication.company && authentication.idcard && authentication.job_title && authentication.salary && authentication.school && authentication.work) {
                    users[index].authentication = true;
                }
                else {
                    users[index].authentication = false;
                }
                users[index].percent = await percentUserinfo(users[index].user_id);
                users[index].photos = JSON.parse(users[index].photos);
                if (!users[index].ip_city && users[index].ip && ips.indexOf(users[index].ip) == '-1') {
                    ipinfoWrapper.lookupIp(users[index].ip).then(async (response) => {
                        if (response.city) {
                            console.log(response.city);
                            await Database_1.default.from('users').where({ user_id: users[index].user_id }).update({
                                ip_city: response.city
                            });
                        }
                    });
                }
                users[index].online_at_fromNow = (0, moment_1.default)(users[index].online_at_fromNow).fromNow();
                users[index].online_at = (0, moment_1.default)(users[index].online_at).format('YYYY-MM-DD HH:mm:ss');
                users[index].created_at = (0, moment_1.default)(users[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/user/index', {
                data: {
                    title: '用户',
                    active: 'users',
                    users,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async edit({ params, request, response, session, view }) {
        try {
            const all = request.all();
            const user = await Database_1.default.from('users').where({ 'user_id': params.user_id, status: 1 }).first();
            user.work = JSON.parse(user.work);
            if (user.work && user.work.value) {
                user.work.text = await zpData.data(user.work.value[0], user.work.value[1]);
            }
            user.photos = JSON.parse(user.photos);
            user.ip = geoip_lite_1.default.lookup(user.ip) || {};
            user.online_at = (0, moment_1.default)(user.online_at).format('YYYY-MM-DD HH:mm:ss');
            user.created_at = (0, moment_1.default)(user.created_at).format('YYYY-MM-DD HH:mm:ss');
            return view.render('admin/user/edit', {
                data: {
                    title: '用户',
                    active: 'users',
                    user
                }
            });
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
    async update({ params, request, response, session }) {
        try {
            const all = request.all();
            if (request.method() == 'POST' && all.button == 'update') {
                await Database_1.default.from('users').where({ user_id: params.user_id }).update({
                    type: all.type,
                    status: all.status,
                    sex: all.sex,
                    mbti: all.mbti || null,
                    height: all.height || '',
                    weight: all.weight || null,
                    nickname: all.nickname || '',
                    avatar_url: all.avatar_url || '',
                    birthday: all.birthday || '',
                    phone: all.phone || '',
                    school: all.school || '',
                    company: all.company || '',
                    job_title: all.job_title || '',
                    contact_wechat: all.contact_wechat || '',
                    detail: all.detail || '',
                    expectation: all.expectation || '',
                    work: all.work || {},
                    photos: JSON.stringify(all.photos || []),
                });
                session.flash('message', { type: 'success', header: '更新成功', message: `` });
                return response.redirect('back');
            }
            return all;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map