"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const moment_1 = __importDefault(require("moment"));
class GoodController {
    async index({ request, view, response }) {
        try {
            const all = request.all();
            const goods = await Database_1.default.from('land_goods').select('id', 'good_catalog', 'good_title', 'good_author', 'good_detail', 'good_theme_url', 'good_original_url').where('status', 1);
            for (let index = 0; index < goods.length; index++) {
                goods[index]['created_at'] = (0, moment_1.default)(goods[index]['created_at']).format('YYYY-MM-DD H:mm:ss');
            }
            if (all.type == 'json') {
                return response.json({
                    status: 200,
                    message: "ok",
                    data: goods
                });
            }
            return view.render('land/admin/good/index', {
                data: {
                    title: '商城商品',
                    active: 'good',
                    goods
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async create({ request, view, session }) {
        try {
            const all = request.all();
            return view.render('land/admin/good/create', {
                data: {
                    title: '创建商城商品',
                    active: 'good'
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async show({ params, request, view, response }) {
        try {
            const all = request.all();
            const good = await Database_1.default.from('land_goods').where('id', params.id).first();
            good.created_at = (0, moment_1.default)(good.created_at).format('YYYY-MM-DD H:mm:ss');
            const data = {
                status: 200,
                message: "ok",
                data: good
            };
            if (all.type == 'json') {
                return response.json(data);
            }
            return view.render('land/admin/good/edit', {
                data
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async edit({ params, request, view, session }) {
        try {
            const all = request.all();
            const good = await Database_1.default.from('land_goods').where('id', params.id).first();
            return view.render('land/admin/good/edit', {
                data: {
                    title: '编辑商城商品',
                    active: 'good',
                    good
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async save({ request, response, session }) {
        try {
            let all = request.all();
            let good_theme_url = all.theme_url || '';
            if (request.file('theme')) {
                const RandomString = require('RandomString');
                const profile = request.file('theme', { type: ['image', 'video'], size: '10mb' });
                const profileName = `${RandomString.generate(32)}.${profile.extname}`;
                const profilePath = `/uploads/themes/`;
                let file = {};
                file.fileName = profile.clientName;
                file.fileSrc = profilePath + profileName;
                await profile.move(Application_1.default.publicPath(profilePath), { name: profileName, overwrite: true });
                good_theme_url = file.fileSrc;
            }
            if (request.method() == 'POST' && all.button == 'update') {
                await Database_1.default.from('land_goods').where('id', all.id).update({ good_catalog: all.catalog, good_title: all.title, good_author: all.author, good_detail: all.detail, good_original_url: all.original_url, good_theme_url });
                session.flash('message', { type: 'success', header: '更新成功', message: `` });
                return response.redirect('back');
            }
            const id = await Database_1.default.table('land_goods').returning('id').insert({
                good_catalog: all.catalog || '',
                good_title: all.title || '',
                good_author: all.author || '',
                good_detail: all.detail || '',
                good_original_url: all.original_url,
                good_theme_url
            });
            session.flash('message', { type: 'success', header: '创建成功', message: `` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${JSON.stringify(error)}。` });
        }
    }
    async delete({ session, request, response }) {
        try {
            const all = request.all();
            await Database_1.default.from('land_goods').where('id', all.id).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            session.flash('message', { type: 'success', header: '商城商品已删除成功！', message: `` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = GoodController;
//# sourceMappingURL=GoodController.js.map