"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const zpData = require('../lib/Zhipin');
const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const RELATION = ["朋友", "亲戚", "伙伴", "同事", "其他"];
class CustomersController {
    async field({ request, response, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').where({ id: all.id }).orderBy('id', 'desc').first();
            switch (all.button) {
                case 're-recommend':
                    await Database_1.default.from('customer').where({ id: all.id }).update({ recommend_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                    break;
                case 'recommend':
                    await Database_1.default.from('customer').where({ id: all.id }).update({ recommend: !customer.recommend, recommend_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                    break;
                case 'delete':
                    await Database_1.default.from('customer').where({ id: all.id }).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                    break;
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
    async index({ request, view, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').select('id', 'user_id', 'introduction', 'relation', 'relation_log_id', 'relation_user_id', 'recommend').where('status', 1).orderBy('id', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < customer.length; index++) {
                if (customer[index].relation_log_id) {
                    customer[index] = {
                        ...customer[index],
                        ...await Database_1.default.from('customer_log').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'work', 'phone', 'created_at', 'modified_at').where('id', customer[index].relation_log_id).first(),
                        percent: await percentCustomerinfo(customer[index].relation_log_id),
                        parent: await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first()
                    };
                }
                if (customer[index].relation_user_id) {
                    customer[index] = {
                        ...customer[index],
                        ...await Database_1.default.from('users').select('nickname', 'avatar_url', 'sex', 'birthday', 'contact_wechat', 'photos', 'videos', 'work', 'phone', 'created_at', 'modified_at').where('user_id', customer[index].relation_user_id).first(),
                        percent: await percentUserinfo(customer[index].relation_user_id),
                        parent: await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].relation_user_id).first()
                    };
                }
                customer[index]['photos'] = customer[index]['photos'] ? JSON.parse(customer[index]['photos']) : [];
                customer[index]['videos'] = customer[index]['videos'] ? JSON.parse(customer[index]['videos']) : [];
                customer[index]['age'] = (0, moment_1.default)().diff(customer[index]['birthday'], 'years');
                customer[index]['work'] = customer[index]['work'] ? JSON.parse(customer[index]['work']) : [];
                customer[index].recommend_at = (0, moment_1.default)(customer[index].recommend_at).format('YYYY-MM-DD HH:mm:ss');
                customer[index].created_at = (0, moment_1.default)(customer[index].created_at).fromNow();
                customer[index].modified_at = (0, moment_1.default)(customer[index].modified_at).fromNow();
                let relation = ["朋友", "亲戚", "伙伴", "同事", "其他"];
                customer[index].relation = relation[customer[index].relation];
                if (customer[index].ip) {
                    await axios({
                        url: `http://whois.pconline.com.cn/ipJson.jsp?ip=${customer[index].ip}&json=true`,
                        responseType: "arraybuffer"
                    }).then((response) => {
                        const data = iconv.decode(response.data, 'gbk');
                        customer[index].ip = data ? JSON.parse(data) : '';
                    }).catch((error) => {
                    });
                }
            }
            const users_recommend = await Database_1.default.from('users_recommend').where('status', 0).orderBy('id', 'asc');
            for (let index = 0; index < users_recommend.length; index++) {
                users_recommend[index].user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', users_recommend[index].user_id).first() || {};
                users_recommend[index].created_at = (0, moment_1.default)(users_recommend[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/customer/index', {
                data: {
                    title: '介绍',
                    active: 'customers',
                    customer,
                    users_recommend,
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
            const customer = await Database_1.default.from('customer').select('id as cid', 'status', 'user_id', 'relation_user_id', 'relation', 'relation_log_id', 'introduction', 'recommend', 'created_at').where({ 'id': params.id, status: 1 }).first();
            customer.relation_text = RELATION[customer.relation];
            if (customer.relation_log_id) {
                console.log(all);
                customer.userinfo = await Database_1.default.from('customer_log').select('*').where({ 'id': customer.relation_log_id }).first();
                if (request.method() == 'POST') {
                    await Database_1.default.from('customer').where({ id: customer.cid }).update({ introduction: all.introduction });
                    await Database_1.default.from('customer_log').where({ id: customer.userinfo.id }).update({ expectation: all.userinfo.expectation || '', photos: JSON.stringify(all.userinfo.photos || []) });
                    session.flash('message', { type: 'success', header: '更新成功', message: `` });
                    return response.redirect('back');
                }
            }
            else if (customer.relation_user_id) {
                customer.userinfo = await Database_1.default.from('users').select('*').where({ 'user_id': customer.relation_user_id }).first();
            }
            customer.parent = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer.user_id).first();
            customer.userinfo.photos = customer.userinfo.photos ? JSON.parse(customer.userinfo.photos) : [];
            customer.userinfo.work = customer.userinfo.work ? JSON.parse(customer.userinfo.work) : [];
            if (customer.userinfo.work.value) {
                customer.userinfo.work.text = await zpData.data(customer.userinfo.work.value[0], customer.userinfo.work.value[1]);
            }
            customer.created_at = (0, moment_1.default)(customer.created_at).format('YYYY-MM-DD HH:mm:ss');
            return view.render('admin/customer/edit', {
                data: {
                    title: '介绍',
                    active: 'customers',
                    customer
                }
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
}
exports.default = CustomersController;
//# sourceMappingURL=CustomersController.js.map