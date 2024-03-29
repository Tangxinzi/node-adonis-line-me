"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const { percentUserinfo } = require('../lib/Percent');
const Verification = require('../lib/Verification');
class OperatesController {
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
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), idcard: all.value });
                            break;
                        case 'school':
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), school: all.value });
                            break;
                        case 'company':
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), company: all.value });
                            break;
                        case 'work':
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), work: all.value });
                            break;
                        case 'job_title':
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), job_title: all.value });
                            break;
                        case 'salary':
                            await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 });
                            await Database_1.default.table('authentication_log').insert({ user_id: session.get('user_id'), salary: all.value });
                            break;
                    }
                }
                switch (all.type) {
                    case 'idcard':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ idcard: 0 });
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ idcard: all.value });
                        break;
                    case 'school':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ school: 0 });
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ school: all.value });
                        break;
                    case 'company':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ company: 0 });
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ company: all.value });
                        break;
                    case 'work':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ work: 0 });
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ work: all.value });
                        break;
                    case 'job_title':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ job_title: 0 });
                        await Database_1.default.from('authentication_log').where({ user_id: session.get('user_id') }).update({ job_title: all.value });
                        break;
                    case 'salary':
                        await Database_1.default.from('authentication').where({ user_id: session.get('user_id') }).update({ salary: 0 });
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
                data = {
                    ...authentication
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
    async pendingType({ params, response, session }) {
        try {
            switch (`${params.table}`) {
                case `users.${params.field}`:
                    var authentication = await Database_1.default.from('verification').select('id', 'value', 'created_at').where({
                        user_id: session.get('user_id'),
                        verification_status: 'pending',
                        is_verified: 0,
                        table: params.table || '',
                        field: params.field || ''
                    }).orderBy('created_at', 'desc').first();
                case 'authentication_log':
                    var authentication = await Database_1.default.from('verification').select('id', 'value', 'created_at').where({
                        user_id: session.get('user_id'),
                        verification_status: 'pending',
                        is_verified: 0,
                        table: params.table || '',
                    }).orderBy('created_at', 'desc').first();
                    break;
                case 'customer':
                    var authentication = await Database_1.default.from('verification').select('id', 'value', 'created_at').where({
                        user_id: session.get('user_id'),
                        verification_status: 'pending',
                        is_verified: 0,
                        table: params.table || ''
                    }).orderBy('created_at', 'desc');
                    break;
                default:
                    var authentication = null;
                    break;
            }
            return response.json({
                status: 200,
                message: "ok",
                data: authentication
            });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
        }
    }
}
exports.default = OperatesController;
//# sourceMappingURL=OperatesController.js.map