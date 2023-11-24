"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class PublishesController {
    async create({ request }) {
        try {
            const all = request.all();
            const data = await Database_1.default.rawQuery('select * from customer');
            const user = await Database_1.default.table('users').returning('id').insert({
                nickname: all.nickname || '',
                birthday: all.birthday || '',
                sex: all.sex || '',
                contact: all.contact || '',
                location: all.location || '',
                introduction: all.introduction || '',
                phtots: all.phtots || '',
                video: all.video || '',
            });
            const customer = await Database_1.default.table('customer').returning('id').insert({
                relation: all.relation || '',
                relation_id: all.relation_id || '',
                detail: all.detail || '',
            });
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = PublishesController;
//# sourceMappingURL=PublishesController.js.map