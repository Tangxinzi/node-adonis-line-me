"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
const RELATION = ["朋友", "亲戚", "伙伴", "同事", "其他"];
const { percentUserinfo } = require('../lib/Percent');
const Verification = require('../lib/Verification');
class AdminController {
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
    async review({ params, request, response, session }) {
        try {
            const all = request.all(), verification = await Database_1.default.from('verification').where({ id: params.id }).first() || {};
            if (request.method() == 'GET') {
                const user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', session.get('user_id')).first() || {};
                const review = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'type').where({ user_id: verification.user_id }).first() || {};
                verification.verification_user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url', 'type').where({ user_id: verification.verification_user_id || '' }).first() || {};
                verification.verification_status = verification.verification_status.toUpperCase();
                verification.created_at = (0, moment_1.default)(verification.created_at).format('MM-DD HH:mm:ss');
                verification.modified_at = verification.modified_at ? (0, moment_1.default)(verification.modified_at).format('MM-DD HH:mm:ss') : '';
                switch (`${verification.table}.${verification.field}`) {
                    case 'users.avatar_url':
                        break;
                    case 'users.photos':
                    case 'customer_log.photos':
                        verification.before = JSON.parse(verification.before);
                        verification.value = JSON.parse(verification.value);
                        break;
                    case 'customer.':
                        verification.value = JSON.parse(verification.value);
                        break;
                    case 'authentication_log.idcard':
                        verification.value = JSON.parse(verification.value);
                        break;
                }
                const field = await Verification.field(`${verification.table}.${verification.field}`);
                verification.text = field[0] + field[1];
                return response.json({
                    status: 200,
                    message: "ok",
                    data: {
                        verification,
                        review,
                        user,
                    }
                });
            }
            if (request.method() == 'POST') {
                const action = await Verification.action(verification, {
                    id: params.id,
                    verification_comment: all.verification_comment || '',
                    verification_status: all.verification_status,
                    verification_user_id: session.get('user_id')
                });
                if (action) {
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: { type: 'success', title: '已操作' }
                    });
                }
                else {
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: { type: 'error', title: '提交失败', message: `请检查您的账号状态或联系管理员。` }
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            return response.json({
                status: 500,
                message: "ok",
                data: { type: 'error', title: '提交失败', message: `请检查您的账号状态或联系管理员。` }
            });
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
                    verify[index].modified_at = verify[index].modified_at ? (0, moment_1.default)(verify[index].modified_at).format('MM-DD HH:mm:ss') : '';
                    const field = await Verification.field(`${verify[index].table}.${verify[index].field}`);
                    switch (`${verify[index].table}.${verify[index].field}`) {
                        case 'customer.':
                            verify[index].table = field[0];
                            verify[index].value = JSON.parse(verify[index].value);
                            break;
                        case 'users.avatar_url':
                        case 'users.photos':
                        case 'customer_log.photos':
                        case 'authentication_log.idcard':
                        case 'authentication_log.school':
                        case 'authentication_log.company':
                        case 'authentication_log.work':
                        case 'authentication_log.job_title':
                        case 'authentication_log.salary':
                            verify[index].table = field[0];
                            verify[index].value = field[1];
                            break;
                    }
                }
            }
            return response.json({
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
    async customer({ request, response, session }) {
        try {
            let customer = (await Database_1.default.rawQuery(`
        SELECT
          customer.id as cid,
          customer.user_id,
          IFNULL(customer_log.sex, users.sex) AS sex,
        	IFNULL(customer_log.nickname, users.nickname) AS nickname,
        	IFNULL(customer_log.avatar_url, users.avatar_url) AS avatar_url,
        	IFNULL(customer_log.birthday, users.birthday) AS birthday,
        	IFNULL(customer_log.height, users.height) AS height,
        	IFNULL(customer_log.weight, users.weight) AS weight,
        	IFNULL(customer_log.work, users.work) AS work,
          users.job_title,
        	IFNULL(customer_log.photos, users.photos) AS photos,
        	IFNULL(customer_log.videos, users.videos) AS videos,
        	IFNULL(customer_log.detail, users.detail) AS detail,
        	IFNULL(customer_log.expectation, users.expectation) AS expectation,
        	IFNULL(customer_log.contact_wechat, users.contact_wechat) AS contact_wechat,
        	IFNULL(customer_log.company, users.company) AS company,
        	IFNULL(customer_log.school, users.school) AS school,
        	IFNULL(customer_log.location, users.location) AS location,
        	IFNULL(customer_log.salary, users.salary) AS salary,
          customer.relation,
          customer.introduction,
          customer.recommend,
          customer.status,
          customer.created_at
        FROM customer
        LEFT JOIN customer_log ON customer.relation_user_id IS NULL AND customer.relation_log_id = customer_log.id
        LEFT JOIN users ON customer.relation_user_id IS NOT NULL AND customer.relation_user_id = users.user_id
        WHERE customer.status IN (1, 2) AND customer.deleted_at IS NULL
        ORDER BY customer.created_at DESC
        LIMIT ${request.input('page', 0) * 15}, 15
      `))[0];
            for (let index = 0; index < customer.length; index++) {
                customer[index].relation = RELATION[customer[index].relation];
                customer[index].parent = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', customer[index].user_id).first() || {};
                customer[index].created_at = (0, moment_1.default)(customer[index].created_at).format('MM-DD HH:mm:ss');
            }
            return response.json({
                status: 200,
                message: "ok",
                data: customer
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async customerStatus({ params, request, response, session }) {
        try {
            switch (params.status) {
                case '0':
                case '1':
                case '2':
                    return await Database_1.default.from('customer').where({ id: params.customer_id }).update({ status: params.status });
            }
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
    async customerRecommend({ params, request, response, session }) {
        try {
            switch (params.recommend) {
                case '0':
                    return await Database_1.default.from('customer').where({ id: params.customer_id }).update({ recommend: 0 });
                case '1':
                    return await Database_1.default.from('customer').where({ id: params.customer_id, status: 1 }).update({ recommend: 1, recommend_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
    async users({ request, response, session }) {
        try {
            const users = await Database_1.default.from('users').select('id', 'type', 'user_id', 'nickname', 'avatar_url', 'detail', 'created_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < users.length; index++) {
                users[index].created_at = (0, moment_1.default)(users[index].created_at).format('MM-DD HH:mm:ss');
            }
            return response.json({
                status: 200,
                message: "ok",
                data: users
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map