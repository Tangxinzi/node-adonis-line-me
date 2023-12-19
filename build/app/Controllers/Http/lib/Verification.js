"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
function regularData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const verified = await Database_1.default.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, is_verified: 0 }).orderBy('modified_at', 'desc').first() || {};
            if (verified.id) {
                await Database_1.default.from('verification').where({ user_id: data.user_id, table: data.table, field: data.field, is_verified: 0 }).update({
                    before: data.before,
                    value: data.value,
                    is_verified: 0,
                    verification_status: 'pending'
                });
                resolve();
            }
            else {
                const id = await Database_1.default.table('verification').insert({ user_id: data.user_id, table: data.table, before: data.before, field: data.field, value: data.value, ip: data.ip }).returning('id');
                resolve(id);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
function action(data, value) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!value.verification_user_id || !value.verification_status) {
                resolve(false);
                return;
            }
            if (value.verification_status == 'rejected' && value.verification_comment == '') {
                resolve(false);
                return;
            }
            const result = await Database_1.default.from('verification').where({ id: value.id, is_verified: 0 }).update({
                is_verified: 1,
                verification_comment: value.verification_comment || '',
                verification_status: value.verification_status,
                verification_user_id: value.verification_user_id,
                modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
            });
            if (result && value.verification_status == 'rejected') {
                switch (`${data.table}.${data.field}`) {
                    case 'customer.':
                        data.value = JSON.parse(data.value);
                        await Database_1.default.from('customer').where('id', data.value.customer_id).update({ status: 2 });
                        break;
                    case 'authentication_log.idcard':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ idcard: '' });
                        break;
                    case 'authentication_log.school':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ school: '' });
                        break;
                    case 'authentication_log.company':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ company: '' });
                        break;
                    case 'authentication_log.work':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ work: '' });
                        break;
                    case 'authentication_log.job_title':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ job_title: '' });
                        break;
                    case 'authentication_log.salary':
                        await Database_1.default.from('authentication_log').where({ user_id: data.user_id }).update({ salary: '' });
                        break;
                }
            }
            if (result && value.verification_status == 'approved') {
                switch (`${data.table}.${data.field}`) {
                    case 'users.avatar_url':
                        await Database_1.default.from('users').where('user_id', data.user_id).update({ avatar_url: data.value });
                        break;
                    case 'users.photos':
                        await Database_1.default.from('users').where('user_id', data.user_id).update({ photos: data.value });
                        break;
                    case 'customer.':
                        data.value = JSON.parse(data.value);
                        await Database_1.default.from('customer').where('id', data.value.customer_id).update({ status: 1 });
                        break;
                    case 'authentication_log.idcard':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ idcard: 1 });
                        break;
                    case 'authentication_log.school':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ school: 1 });
                        break;
                    case 'authentication_log.company':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ company: 1 });
                        break;
                    case 'authentication_log.work':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ work: 1 });
                        break;
                    case 'authentication_log.job_title':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ job_title: 1 });
                        break;
                    case 'authentication_log.salary':
                        await Database_1.default.from('authentication').where({ user_id: data.user_id }).update({ salary: 1 });
                        break;
                }
            }
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    regularData,
    action
};
//# sourceMappingURL=Verification.js.map