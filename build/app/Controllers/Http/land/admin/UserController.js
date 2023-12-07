"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
const { jscode2session, token, getUserPhoneNumber } = require('./Weixin');
class UserController {
    async wxLogin({ request, response, view, session }) {
        try {
            const all = request.all();
            const result = await jscode2session(all.code);
            const user = await Database_1.default.from('land_users').where('wechat_open_id', result.openid).first();
            if (user) {
                return user;
            }
            else {
                const id = await Database_1.default.table('land_users').insert({ wechat_open_id: result.openid }).returning('id');
                return await Database_1.default.from('land_users').where('id', id[0]).first();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async userinfo({ request, response, view, session }) {
        try {
            const all = request.all();
            if (request.method() == 'GET') {
                const user = await Database_1.default.from('land_users').where('wechat_open_id', all.openid).first();
                user.collection_num = (await Database_1.default.from('land_collection').where({ wechat_open_id: all.openid, status: 1 }).count('* as total'))[0].total || 0;
                return user;
            }
            else {
                const result = await jscode2session(all.code);
                await Database_1.default.from('land_users').where('wechat_open_id', result.openid).update({ nickname: all.nickname, avatar_url: all.avatar_url });
                return await Database_1.default.from('land_users').where('wechat_open_id', result.openid).first();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async collection({ request, response, view, session }) {
        try {
            const all = request.all();
            if (all.type == 'designer') {
                if (all.search) {
                    var data = await Database_1.default.from('land_collection').join('land_designers', 'land_collection.relation_type_id', 'land_designers.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_designers.status': 1 }).select('land_designers.id', 'land_designers.avatar_url', 'land_designers.nickname', 'land_designers.labels').where('land_designers.title', 'like', `%${all.search}%`).orderBy('land_designers.created_at', 'desc');
                }
                else {
                    var data = await Database_1.default.from('land_collection').join('land_designers', 'land_collection.relation_type_id', 'land_designers.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_designers.status': 1 }).select('land_designers.id', 'land_designers.avatar_url', 'land_designers.nickname', 'land_designers.labels');
                }
            }
            if (all.type == 'work') {
                if (all.search) {
                    var data = await Database_1.default.from('land_collection').join('land_works', 'land_collection.relation_type_id', 'land_works.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_works.status': 1 }).select('land_works.id', 'land_works.theme_url', 'land_works.title', 'land_works.labels').where('land_works.title', 'like', `%${all.search}%`).orderBy('land_works.created_at', 'desc');
                }
                else {
                    var data = await Database_1.default.from('land_collection').join('land_works', 'land_collection.relation_type_id', 'land_works.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_works.status': 1 }).select('land_works.id', 'land_works.theme_url', 'land_works.title', 'land_works.labels');
                }
            }
            if (all.type == 'good') {
                if (all.search) {
                    var data = await Database_1.default.from('land_collection').join('land_goods', 'land_collection.relation_type_id', 'land_goods.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_goods.status': 1 }).select('land_goods.id', 'land_goods.good_theme_url', 'land_goods.good_name', 'land_goods.good_brand').where('land_goods.good_name', 'like', `%${all.search}%`).orderBy('land_goods.created_at', 'desc');
                }
                else {
                    var data = await Database_1.default.from('land_collection').join('land_goods', 'land_collection.relation_type_id', 'land_goods.id').where({ 'land_collection.type': all.type, 'land_collection.wechat_open_id': all.openid, 'land_collection.status': 1, 'land_goods.status': 1 }).select('land_goods.id', 'land_goods.good_theme_url', 'land_goods.good_name', 'land_goods.good_brand');
                }
            }
            for (let index = 0; index < data.length; index++) {
                data[index].good_theme_url = data[index].good_theme_url ? JSON.parse(data[index].good_theme_url) : [];
                data[index].labels = data[index].labels ? data[index].labels.split(',') : [];
            }
            return response.json({ status: 200, message: "ok", data });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getPhoneNumber({ request, response, view, session }) {
        try {
            const all = request.all();
            const result = await token();
            const phone = await getUserPhoneNumber(result.access_token, { code: all.code, openid: all.openid });
            await Database_1.default.from('land_users').where('wechat_open_id', all.openid).update({ phone: phone.phone_info.phoneNumber });
            return response.json({ status: 200, message: "ok", data: phone.phone_info });
        }
        catch (error) {
            console.log(error);
        }
    }
    async like({ params, request, response, session }) {
        try {
            let data = {};
            const all = request.all();
            const coll = await Database_1.default.from('land_collection').where({ wechat_open_id: all.openid, relation_type_id: params.id, type: all.type }).first();
            if (request.method() == 'GET') {
                return response.json({ status: 200, message: "ok", data: coll });
            }
            if (coll && coll.id) {
                data = await Database_1.default.from('land_collection').where({ relation_type_id: params.id }).update({ status: coll.status ? 0 : 1, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            else {
                data = await Database_1.default.table('land_collection').insert({ type: all.type, relation_type_id: params.id, wechat_open_id: all.openid });
            }
            const dataColl = await Database_1.default.from('land_collection').where({ relation_type_id: params.id, type: all.type, status: 1, wechat_open_id: all.openid }).first();
            data = {
                ...data,
                like: dataColl && dataColl.id ? true : false
            };
            response.json({ status: 200, message: "ok", data });
        }
        catch (error) {
            console.log(error);
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map