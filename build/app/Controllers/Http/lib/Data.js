"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
function record(data) {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.user_id || data.wechat_open_id)
                resolve(false);
            const datas = await Database_1.default.from('datas').where({ table: data.table, field: data.field, field_value: data.field_value, user_id: data.user_id || '', wechat_open_id: data.wechat_open_id || '', category: data.category }).orderBy('created_at', 'desc').first() || {};
            const milliseconds = (0, moment_1.default)().diff(datas.created_at, 'milliseconds');
            if (milliseconds == 0 || milliseconds > 100 * 1000) {
                await Database_1.default.table('datas').insert({ table: data.table, field: data.field, field_value: data.field_value, user_id: data.user_id || '', wechat_open_id: data.wechat_open_id || '', category: data.category, count: data.count });
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
module.exports = {
    record
};
//# sourceMappingURL=Data.js.map