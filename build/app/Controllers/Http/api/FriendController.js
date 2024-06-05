"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
class FriendController {
    async verify({ response, request, session }) {
        try {
            const all = request.all();
            const sms = await Database_1.default.from('sms').where({ phone: all.phone, code: all.code }).first() || {};
            if (sms.id) {
                if (!((0, moment_1.default)(sms.created_at).diff((0, moment_1.default)()) > 5 * 60 * 1000)) {
                    return response.json({ status: 200, message: "error", data: '验证码已过期' });
                }
                const customer = await Database_1.default.from('customer').where({ id: all.id, verify_phone: all.phone }).whereIn('status', [1, 2]).first() || {};
                if (customer.id) {
                    return response.json({
                        status: 200,
                        message: "success",
                        data: await Jwt_1.default.signPrivateKey(all.phone)
                    });
                }
                else {
                    return response.json({ status: 200, message: "error", data: '未找到验证信息' });
                }
            }
            else {
                return response.json({ status: 200, message: "error", data: '验证码有误' });
            }
        }
        catch (error) {
            console.log(error);
            return response.json({ status: 200, message: "error" });
        }
    }
    async updateCustomerField({ params, request, response }) {
        try {
            const userSign = request.header('User-Sign');
            const verify_phone = Jwt_1.default.verifyPublicKey(userSign || '');
            const all = request.all();
            let customer = await Database_1.default.from('customer').where({ id: params.id, verify_phone }).first();
            switch (`${all.type}.${all.field}`) {
                case 'customer.relation':
                    var result = await Database_1.default.from('customer').where({ id: params.id, verify_phone }).update({ relation: all.value.relation, relation_text: all.value.relation_text });
                    break;
                case 'customer.introduction':
                    var result = await Database_1.default.from('customer').where({ id: params.id, verify_phone }).update({ introduction: all.value });
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
                    var result = await Database_1.default.from('customer_log').where({ id: customer.relation_log_id }).update({ work: JSON.stringify(all.value), work_code: all.value ? all.value.code : '' });
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
            response.json({
                status: 500,
                sms: "error",
                data: ''
            });
        }
    }
}
exports.default = FriendController;
//# sourceMappingURL=FriendController.js.map