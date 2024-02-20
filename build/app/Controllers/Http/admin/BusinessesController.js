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
                business[index].created_at = (0, moment_1.default)(business[index].created_at).format('YYYY-MM-DD H:mm:ss');
            }
            return view.render('admin/business/index', {
                data: {
                    title: '机构',
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
    async create({ request, session, response }) {
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
            const business_id = (0, uuid_1.v4)();
            await Database_1.default.table('business').insert({
                business_id,
                logo,
                user_id: '',
                name: all.name,
                description: all.description,
            });
            session.flash('message', { type: 'success', header: '创建成功', message: `${all.name}主体已创建。` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = BusinessesController;
//# sourceMappingURL=BusinessesController.js.map