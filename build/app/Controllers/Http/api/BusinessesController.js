"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
class BusinessesController {
    async index({ request, view, response }) {
    }
    async show({ params, request, view, response }) {
        try {
            const business = await Database_1.default.from('business').where('business_id', params.id).andWhereNull('deleted_at').first();
            business.users = (await Database_1.default.rawQuery(`
        SELECT business_users.user_id, users.nickname, users.avatar_url, business_users.created_at
        FROM business_users
        JOIN users
        ON business_users.user_id = users.user_id
        WHERE business_users.business_id = '${params.id}' AND business_users.status = 1
        ORDER BY business_users.created_at DESC
      `))[0];
            for (let index = 0; index < business.users.length; index++) {
                business.users[index].created_at = (0, moment_1.default)(business.users[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/business/show', {
                data: {
                    title: business.name,
                    active: 'business',
                    business
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async lists({ params, session, request, view, response }) {
        try {
            const business = (await Database_1.default.rawQuery(`
        SELECT business.business_id, business.name, business.description, business.labels, business.logo
        FROM business_users
        JOIN business
        WHERE business_users.user_id = '${session.get('user_id')}' AND business_users.business_id = business.business_id
        ORDER BY business_users.created_at DESC
      `))[0];
            for (let index = 0; index < business.length; index++) {
                business[index].labels = business[index].labels ? business[index].labels.split(',') : [];
            }
            return response.json({ status: 200, message: "ok", data: business });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map