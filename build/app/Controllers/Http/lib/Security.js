"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const { msgSecCheck, mediaCheck } = require('./Weixin');
exports.center = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let result = '';
            if (data.review.type == 'text') {
                result = await msgSecCheck({ ...data.review });
                if (result.result.suggest != 'pass') {
                    await Database_1.default.table('security').insert({
                        security_type: 'text',
                        table: data.database.table,
                        field: data.database.field,
                        table_id: data.database.table_id,
                        user_id: data.database.user_id,
                        content: data.review.content || ''
                    });
                }
            }
            if (data.review.type == 'image') {
                data.review.media_type = 2;
                result = await mediaCheck({ ...data.review });
            }
            console.log(data, result);
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
    });
};
//# sourceMappingURL=Security.js.map