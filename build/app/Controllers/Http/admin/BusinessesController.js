"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const moment_1 = __importDefault(require("moment"));
const randomstring_1 = __importDefault(require("randomstring"));
const uuid_1 = require("uuid");
class BusinessesController {
    async index({ request, view, response }) {
        try {
            const all = request.all();
            const business = await Database_1.default.from('business').andWhereNull('deleted_at').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < business.length; index++) {
                business[index].labels = business[index].labels ? business[index].labels.split(',') : [];
                business[index].user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', business[index].user_id).first();
                business[index].count = (await Database_1.default.from('business_users').where({ business_id: business[index].business_id, status: 1 }).count('* as total'))[0].total || 0;
                business[index].created_at = (0, moment_1.default)(business[index].created_at).format('YYYY-MM-DD H:mm:ss');
            }
            return view.render('admin/business/index', {
                data: {
                    title: '主体',
                    active: 'business',
                    business
                }
            });
        }
        catch (error) {
            console.log(error);
        }
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
    async save({ request, session, response }) {
        try {
            let all = request.all(), logo = '';
            if (request.file('logo')) {
                const profile = request.file('logo', { type: ['image'], size: '10mb' });
                const profileName = `${randomstring_1.default.generate(32)}.${profile.extname}`;
                const profilePath = `/uploads/logo/`;
                let file = {
                    fileName: '',
                    fileSrc: ''
                };
                file.fileName = profile.clientName;
                file.fileSrc = profilePath + profileName;
                await profile.move(Application_1.default.publicPath(profilePath), { name: profileName, overwrite: true });
                logo = file.fileSrc;
            }
            if (all.button == 'create') {
                const business_id = (0, uuid_1.v4)();
                await Database_1.default.table('business').insert({
                    business_id,
                    logo,
                    user_id: all.user_id || '',
                    name: all.name || '',
                    type: all.type || '',
                    labels: all.labels || '',
                    description: all.description,
                });
                session.flash('message', { type: 'success', header: '创建成功', message: `${all.name}主体已创建。` });
            }
            if (all.button == 'update') {
                await Database_1.default.from('business').where('business_id', all.business_id).update({
                    logo: logo || all.logo,
                    user_id: all.user_id || '',
                    name: all.name || '',
                    type: all.type || '',
                    labels: all.labels || '',
                    description: all.description
                });
                session.flash('message', { type: 'success', header: '更新成功', message: `${all.name}主体信息已更新。` });
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map