"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const Verification = require('../lib/Verification');
const { percentUserinfo, percentCustomerinfo } = require('../lib/Percent');
const Messages = require('../lib/Messages');
class OperatesController {
    async index({ request, response, view, session }) {
        try {
            const all = request.all(), operates = await Database_1.default.from('users_operates').orderBy('status', 'desc').orderBy('created_at', 'desc');
            for (let index = 0; index < operates.length; index++) {
                operates[index].customerTotal = (await Database_1.default.from('customer').where({ status: 1, user_id: operates[index].user_id }).count('* as total'))[0].total;
                operates[index].userinfo = await Database_1.default.from('users').select('avatar_url', 'nickname', 'phone').where({ user_id: operates[index].user_id }).first() || {};
                operates[index].created_at = (0, moment_1.default)(operates[index].created_at).format('YYYY-MM-DD HH:mm:ss');
                operates[index].modified_at = (0, moment_1.default)(operates[index].modified_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/operates/index', {
                data: {
                    title: '权限用户 - 运营',
                    active: 'operates',
                    subActive: 'users',
                    operates,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async rewardVideo({ request, response, view, session }) {
        try {
            const all = request.all(), gift = await Database_1.default.from('reward-gift').orderBy('created_at', 'desc');
            for (let index = 0; index < gift.length; index++) {
                gift[index].userinfo = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', gift[index].user_id).first() || {};
                gift[index].created_at = (0, moment_1.default)(gift[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            if (request.method() == 'POST') {
                if (!((parseInt(all.status) >= 0) || all.user_id || all.id)) {
                    session.flash('message', { type: 'error', header: '操作失败', message: `请检查必填项 ${JSON.stringify(all)}` });
                    return response.redirect('back');
                }
                await Database_1.default.from('reward-gift').where({ id: all.id, user_id: all.user_id }).update({
                    status: all.status,
                    message: all.message || null,
                    modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                });
                if (all.message) {
                    await Messages.push({ user_id: all.user_id, content: all.message });
                }
                session.flash('message', { type: 'success', header: '已操作', message: `${all.nickname} ${all.messages}` });
                return response.redirect('back');
            }
            return view.render('admin/operates/reward-video', {
                data: {
                    title: '兑换好礼 - 运营',
                    active: 'operates',
                    subActive: 'reward-video',
                    gift,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
            session.flash('message', { type: 'error', header: '遇到错误', message: `请检查必填项 ${JSON.stringify(error)}` });
            return response.redirect('back');
        }
    }
    async save({ request, response, view, session }) {
        try {
            const all = request.all();
            if (all.button == 'insert') {
                const user_id = all.user_id.split(',');
                for (let index = 0; index < user_id.length; index++) {
                    await Database_1.default.table('users_operates').returning('id').insert({ type: all.type, user_id: user_id[index] });
                }
                session.flash('message', { type: 'success', header: '创建成功', message: `已添加特邀用户 ${JSON.stringify(user_id)}` });
            }
            if (all.button == 'edit') {
                await Database_1.default.from('users_operates').where({ status: 1, user_id: all.user_id }).update({ price: all.price || '', type: all.type || '' });
                session.flash('message', { type: 'success', header: '更新成功', message: all.user_id });
            }
            if (all.button == 'delete') {
                await Database_1.default.from('users_operates').where({ id: all.id }).update({ status: all.status == 0 ? 1 : 0 });
                session.flash('message', { type: 'success', header: '状态已调整', message: `` });
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            session.flash('message', { type: 'error', header: '提交失败', message: `${JSON.stringify(error)}` });
            return response.redirect('back');
        }
    }
    async incentive({ request, response, view, session }) {
        try {
            const all = request.all(), operates_log = (await Database_1.default.rawQuery(`
          SELECT 
            users_operates_log.id AS id, 
            users_operates_log.customer_id, 
            users_operates_log.customer_log_id, 
            users_operates_log.user_id, 
            users_operates_log.loading, 
            users_operates_log.price, 
            customer.recommend, 
            customer.introduction, 
            customer.verify_phone, 
            customer.recommend_at, 
            customer.status AS c_status,
            users.avatar_url, 
            users.nickname, 
            users.phone,
            users_operates_log.created_at
          FROM users_operates_log 
          LEFT JOIN customer ON users_operates_log.customer_id = customer.id 
          LEFT JOIN users ON users_operates_log.user_id = users.user_id
          WHERE customer.status IN (${all.orderBy || '1'})
          ORDER BY users_operates_log.id DESC
          LIMIT ${request.input('page', 0) * 15}, 15
      `))[0];
            for (let index = 0; index < operates_log.length; index++) {
                if (operates_log[index].customer_log_id) {
                    operates_log[index] = {
                        ...operates_log[index],
                        percent: await percentCustomerinfo(operates_log[index].customer_log_id),
                        customer: {
                            ...await Database_1.default.from('customer_log').select('avatar_url', 'nickname', 'sex', 'work', 'company', 'birthday', 'phone', 'photos', 'location').where('id', operates_log[index].customer_log_id).first() || {}
                        }
                    };
                }
                operates_log[index].created_at = (0, moment_1.default)(operates_log[index].created_at).format('YYYY-MM-DD HH:mm:ss');
                operates_log[index].modified_at = (0, moment_1.default)(operates_log[index].modified_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/operates/incentive', {
                data: {
                    title: '激励下发 - 运营',
                    active: 'operates',
                    subActive: 'incentive',
                    operates_log,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async verification({ request, response, view, session }) {
        try {
            const all = request.all(), verification = await Database_1.default.from('verification').orderBy('is_verified', 'asc').orderBy('id', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < verification.length; index++) {
                if (verification[index].field == 'photos') {
                    verification[index].before = JSON.parse(verification[index].before);
                    verification[index].value = JSON.parse(verification[index].value);
                }
                verification[index].userinfo = await Database_1.default.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].user_id }).first();
                verification[index].checker = await Database_1.default.from('users').select('avatar_url', 'nickname').where({ user_id: verification[index].verification_user_id }).first() || {};
                verification[index].verification_status = verification[index].verification_status.toUpperCase();
                verification[index].created_at = (0, moment_1.default)(verification[index].created_at).fromNow();
                verification[index].modified_at = verification[index].modified_at ? (0, moment_1.default)(verification[index].modified_at).format('YYYY-MM-DD HH:mm:ss') : '';
            }
            return view.render('admin/operates/verification', {
                data: {
                    title: '内容审核 - 运营',
                    active: 'operates',
                    subActive: 'verification',
                    verification,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async review({ params, request, response, view, session }) {
        try {
            const all = request.all(), verification = await Database_1.default.from('verification').where({ id: params.id }).first();
            if (request.method() == 'GET') {
                if (verification.is_verified == 0) {
                    var user = await Database_1.default.from('users').where('id', Jwt_1.default.verifyPublicKey(all.sign || session.get('adonis-cookie-sign'))).first() || {};
                }
                else {
                    var user = await Database_1.default.from('users').where('user_id', verification.verification_user_id).first() || {};
                }
                const review = await Database_1.default.from('users').where({ user_id: verification.user_id }).first();
                verification.created_at = (0, moment_1.default)(verification.created_at).format('YYYY-MM-DD HH:mm:ss');
                verification.modified_at = verification.modified_at ? (0, moment_1.default)(verification.modified_at).format('YYYY-MM-DD HH:mm:ss') : '';
                switch (`${verification.table}.${verification.field}`) {
                    case 'users.avatar_url':
                        break;
                    case 'users.photos':
                        verification.before = JSON.parse(verification.before);
                        verification.value = JSON.parse(verification.value);
                        break;
                    case 'customer.':
                        verification.value = JSON.parse(verification.value);
                        break;
                    case 'authentication_log.':
                        break;
                }
                return view.render('admin/operates/review', {
                    data: {
                        title: '内容审核 - 运营',
                        active: 'operates',
                        subActive: 'verification',
                        verification,
                        review,
                        user,
                        all
                    }
                });
            }
            if (request.method() == 'POST') {
                const action = await Verification.action(verification, {
                    id: params.id,
                    verification_comment: all.verification_comment || '',
                    verification_status: all.verification_status,
                    verification_user_id: all.verification_user_id
                });
                if (action) {
                    session.flash('message', { type: 'success', header: '已操作', message: `${JSON.stringify(all)}` });
                }
                else {
                    session.flash('message', { type: 'error', header: '提交失败', message: `请检查您的账号状态或联系管理员。` });
                }
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async introduction({ params, request, response, view, session }) {
        try {
            const all = request.all();
            if (request.method() == 'GET') {
                const labels = {
                    step_1: await Database_1.default.from('labels').whereIn('type', [1]).orderBy('sort', 'asc'),
                    step_2: await Database_1.default.from('labels').whereIn('type', [2]).orderBy('sort', 'asc'),
                };
                return view.render('admin/operates/introduction', {
                    data: {
                        title: '标签 - 运营',
                        active: 'operates',
                        subActive: 'introduction',
                        labels
                    }
                });
            }
            if (request.method() == 'POST') {
                if (all.button == 'insert') {
                    const id = await Database_1.default.table('labels').returning('id').insert({
                        type: all.type,
                        name: all.name
                    });
                    if (id.length) {
                        session.flash('message', { type: 'success', header: '提交成功', message: `已创建标签 ${all.name}` });
                    }
                    else {
                        session.flash('message', { type: 'error', header: '提交失败', message: `${JSON.stringify(all)}` });
                    }
                }
                if (all.button == 'save') {
                    await Database_1.default.from('labels').where({ id: all.id }).update({ name: all.name, sort: all.sort });
                    session.flash('message', { type: 'success', header: '更新成功', message: `已删除标签 ${all.name}` });
                }
                if (all.button == 'delete') {
                    await Database_1.default.from('labels').where({ id: all.id }).update({ status: 0 });
                    session.flash('message', { type: 'success', header: '更新成功', message: `已删除标签 ${all.name}` });
                }
                return response.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            session.flash('message', { type: 'error', header: '提交失败', message: `${JSON.stringify(error)}` });
            return response.redirect('back');
        }
    }
}
exports.default = OperatesController;
//# sourceMappingURL=OperatesController.js.map