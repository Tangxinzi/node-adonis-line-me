"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class OperatesController {
    async index({ request, response, view, session }) {
        try {
            const all = request.all(), operates = await Database_1.default.table('users_operates');
            for (let index = 0; index < operates.length; index++) {
                operates[index].customerTotal = (await Database_1.default.from('customer').where({ status: 1, user_id: operates[index].user_id }).count('* as total'))[0].total;
                operates[index].userinfo = await Database_1.default.from('users').select('avatar_url', 'nickname').where({ user_id: operates[index].user_id }).first();
                operates[index].created_at = (0, moment_1.default)(operates[index].created_at).format('YYYY-MM-DD hh:mm:ss');
                operates[index].modified_at = (0, moment_1.default)(operates[index].modified_at).format('YYYY-MM-DD hh:mm:ss');
            }
            return view.render('admin/operates/index', {
                data: {
                    title: '特邀用户 - 运营',
                    active: 'operates',
                    subActive: 'users',
                    operates,
                    all
                }
            });
        }
        catch (error) {
        }
    }
    async save({ request, response, view, session }) {
        try {
            const all = request.all();
            const user_id = all.user_id.split(',');
            for (let index = 0; index < user_id.length; index++) {
                await Database_1.default.table('users_operates').returning('id').insert({ user_id: user_id[index] });
            }
            session.flash('message', { type: 'success', header: '创建成功', message: `已添加特邀用户 ${JSON.stringify(user_id)}` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = OperatesController;
//# sourceMappingURL=OperatesController.js.map