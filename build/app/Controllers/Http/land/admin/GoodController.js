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
            const goods = await Database_1.default.from('land_goods').select('*').where('status', 1).orderBy('created_at', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < goods.length; index++) {
                goods[index].catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ id: goods[index].good_catalog, status: 1 }).first();
                goods[index].created_at = (0, moment_1.default)(goods[index].created_at).format('YYYY-MM-DD H:mm:ss');
            }
            if (all.type == 'json') {
                const goods = await Database_1.default.from('land_goods').select('*').where('status', 1).orderBy('created_at', 'desc').forPage(request.input('page', 1), 8);
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
    async create({ view }) {
        try {
            const catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ level: 1, status: 1 }).orderBy('created_at', 'desc');
            for (let index = 0; index < catalog.length; index++) {
                catalog[index].sub_catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status: 1 });
            }
            return view.render('land/admin/good/create', {
                data: {
                    title: '创建商城商品',
                    active: 'good',
                    catalog
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async catalog({ request, response, view, session }) {
        try {
            const all = request.all();
            const catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ level: 1, status: 1 }).orderBy('sort', 'asc');
            for (let index = 0; index < catalog.length; index++) {
                catalog[index].sub_catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status: 1 }).orderBy('sort', 'asc');
            }
            if (request.method() == 'GET') {
                let log = {};
                if (all.id) {
                    log = await Database_1.default.from('land_goods_catalog').select('*').where({ id: all.id, status: 1 }).first();
                }
                if (all.type == 'json') {
                    return response.json({
                        status: 200,
                        message: "ok",
                        data: catalog
                    });
                }
                return view.render('land/admin/good/catalog', {
                    data: {
                        title: '目录',
                        active: 'catalog',
                        catalog,
                        log,
                        all
                    }
                });
            }
            if (request.method() == 'POST' && all.button == 'save') {
                let theme_url = all.theme_url || '';
                if (request.file('theme_url')) {
                    const RandomString = require('RandomString');
                    const profile = request.file('theme_url', { type: ['image', 'video'], size: '10mb' });
                    const profileName = `${RandomString.generate(32)}.${profile.extname}`;
                    const profilePath = `/uploads/catalogs/`;
                    let file = {};
                    file.fileName = profile.clientName;
                    file.fileSrc = profilePath + profileName;
                    await profile.move(Application_1.default.publicPath(profilePath), { name: profileName, overwrite: true });
                    theme_url = file.fileSrc;
                }
                const id = await Database_1.default.table('land_goods_catalog').returning('id').insert({
                    name: all.name || '',
                    level: all.is_catalog == 1 ? 1 : 2,
                    parent_catalog_id: all.parent_catalog_id ? parseInt(all.parent_catalog_id) : '',
                    sort: all.sort,
                    theme_url
                });
                session.flash('message', { type: 'success', header: '创建成功', message: `` });
                return response.redirect('back');
            }
            if (request.method() == 'POST' && all.button == 'update') {
                let theme_url = all.theme_url || '';
                if (request.file('theme_url')) {
                    const RandomString = require('RandomString');
                    const profile = request.file('theme_url', { type: ['image', 'video'], size: '10mb' });
                    const profileName = `${RandomString.generate(32)}.${profile.extname}`;
                    const profilePath = `/uploads/catalogs/`;
                    let file = {};
                    file.fileName = profile.clientName;
                    file.fileSrc = profilePath + profileName;
                    await profile.move(Application_1.default.publicPath(profilePath), { name: profileName, overwrite: true });
                    theme_url = file.fileSrc;
                }
                const id = await Database_1.default.from('land_goods_catalog').where({ id: all.id }).update({
                    name: all.name || '',
                    level: all.is_catalog == 1 ? 1 : 2,
                    parent_catalog_id: all.parent_catalog_id ? parseInt(all.parent_catalog_id) : '',
                    sort: all.sort,
                    theme_url
                });
                session.flash('message', { type: 'success', header: '更新成功', message: `` });
                return response.redirect('back');
            }
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
            const catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ level: 1, status: 1 }).orderBy('created_at', 'desc');
            for (let index = 0; index < catalog.length; index++) {
                catalog[index].sub_catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status: 1 });
            }
            const data = {
                status: 200,
                message: "ok",
                data: good
            };
            if (all.type == 'json') {
                return response.json(data);
            }
            return view.render('land/admin/good/edit', {
                data,
                catalog
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
            const catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ level: 1, status: 1 }).orderBy('created_at', 'desc');
            for (let index = 0; index < catalog.length; index++) {
                catalog[index].sub_catalog = await Database_1.default.from('land_goods_catalog').select('*').where({ parent_catalog_id: catalog[index].id, level: 2, status: 1 });
            }
            return view.render('land/admin/good/edit', {
                data: {
                    title: '编辑商城商品',
                    active: 'good',
                    good,
                    catalog
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
                await Database_1.default.from('land_goods').where('id', all.id).update({
                    good_catalog: all.good_catalog || '',
                    good_name: all.good_name,
                    good_brand: all.good_brand,
                    detail: all.detail,
                    good_theme_url
                });
                session.flash('message', { type: 'success', header: '更新成功', message: `` });
                return response.redirect('back');
            }
            const id = await Database_1.default.table('land_goods').returning('id').insert({
                good_catalog: all.good_catalog || '',
                good_name: all.good_name || '',
                good_brand: all.good_brand || '',
                detail: all.detail || '',
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
            if (all.button == 'good') {
                await Database_1.default.from('land_goods').where('id', all.id).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                session.flash('message', { type: 'success', header: '商城商品已删除成功！', message: `` });
            }
            if (all.button == 'catalog') {
                await Database_1.default.from('land_goods_catalog').where('id', all.id).update({ status: 0, deleted_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                session.flash('message', { type: 'success', header: '商城商品已删除成功！', message: `` });
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = GoodController;
//# sourceMappingURL=GoodController.js.map