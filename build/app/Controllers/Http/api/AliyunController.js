"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const randomstring_1 = __importDefault(require("randomstring"));
const sms_sdk_1 = __importDefault(require("@alicloud/sms-sdk"));
const moment_1 = __importDefault(require("moment"));
class AliyunController {
    async SendSms({ response, request, session }) {
        try {
            const all = request.all();
            const client = new sms_sdk_1.default({
                accessKeyId: Env_1.default.get('accessKeyId'),
                secretAccessKey: Env_1.default.get('secretAccessKey'),
                endpoint: 'https://dysmsapi.aliyuncs.com',
                apiVersion: '2017-05-25'
            });
            const code = randomstring_1.default.generate({ length: 4, charset: ['numeric'] });
            const params = {
                "RegionId": "default",
                "PhoneNumbers": all.PhoneNumbers || '',
                "SignName": "江南商城",
                "TemplateCode": "SMS_275205487",
                "TemplateParam": JSON.stringify({
                    "code": code
                })
            };
            let sms = await Database_1.default.from('sms').where({ phone: all.PhoneNumbers, user_id: session.get('user_id') }).orderBy('created_at', 'desc').first();
            if (sms) {
                const seconds = (0, moment_1.default)().diff(sms.created_at, 'seconds');
                if (seconds < 300) {
                    response.json({ status: 200, message: "timeout", data: '当前验证码已失效' });
                }
            }
            client.sendSMS(params).then(async (result) => {
                console.log(result);
                await Database_1.default.table('sms').insert({ user_id: session.get('user_id'), phone: all.PhoneNumbers, code, result: JSON.stringify(result), ip: request.ip() });
                return { errno: 1, message: result };
            }, async (ex) => {
                console.error(ex);
                await Database_1.default.table('sms').insert({ user_id: session.get('user_id'), phone: all.PhoneNumbers, code, result: JSON.stringify(ex), ip: request.ip() });
                return { errno: 0, message: ex };
            });
        }
        catch (e) {
            console.log(e);
            return { errno: 0, message: e };
        }
    }
}
exports.default = AliyunController;
//# sourceMappingURL=AliyunController.js.map