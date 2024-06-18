"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const Zhipin_1 = __importDefault(require("../lib/Zhipin"));
const Data_1 = __importDefault(require("../lib/Data"));
class EventController {
    async datas({ params, request, response, session }) {
        try {
            const all = request.all();
            const customer = await Database_1.default.from('customer').where({ id: all.field_value, status: 1 }).first() || {};
            if (customer.id) {
                return await Data_1.default.record({ table: 'customer', field: 'id', field_value: all.field_value, user_id: session.get('user_id'), wechat_open_id: all.wechat_open_id, category: all.category, count: all.count || 1 });
            }
            else {
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async like({ params, request, response, session }) {
        try {
            const all = request.all();
            if (request.method() == 'GET') {
                let customer = [];
                switch (params.type) {
                    case 'customer':
                        customer = await Database_1.default.from('likes').select('customer.id as cid', 'relation_log_id', 'likes.created_at').where({ 'likes.type': 'customer', 'likes.user_id': session.get('user_id') }).join('customer', 'likes.relation_type_id', '=', 'customer.id').where({ 'likes.status': 1, 'customer.status': 1 }).orderBy('likes.created_at', 'desc');
                        for (let index = 0; index < customer.length; index++) {
                            customer[index].created_at = (0, moment_1.default)(customer[index].created_at).format('YYYY-MM-DD HH:mm');
                            if (customer[index].relation_user_id) {
                                const user = await Database_1.default.from('users').select('avatar_url', 'nickname', 'birthday', 'photos', 'work').where('user_id', customer[index].relation_user_id).first() || {};
                                user.age = (0, moment_1.default)().diff(user.birthday, 'years');
                                user.work = user.work ? JSON.parse(user.work) : [];
                                user.photos = user.photos ? JSON.parse(user.photos) : [];
                                if (user.work.value) {
                                    user.work.text = await Zhipin_1.default.data(user.work.value[0], user.work.value[1]);
                                }
                                customer[index] = {
                                    ...customer[index],
                                    ...user
                                };
                            }
                            else if (customer[index].relation_log_id) {
                                const customer_log = await Database_1.default.from('customer_log').select('avatar_url', 'nickname', 'birthday', 'photos', 'work').where('id', customer[index].relation_log_id).first() || {};
                                customer_log.age = (0, moment_1.default)().diff(customer_log.birthday, 'years');
                                customer_log.work = customer_log.work ? JSON.parse(customer_log.work) : [];
                                customer_log.photos = customer_log.photos ? JSON.parse(customer_log.photos) : [];
                                if (customer_log.work.value) {
                                    customer_log.work.text = await Zhipin_1.default.data(customer_log.work.value[0], customer_log.work.value[1]);
                                }
                                customer[index] = {
                                    ...customer[index],
                                    ...customer_log
                                };
                            }
                        }
                        break;
                }
                return response.json({ status: 200, message: "ok", data: customer });
            }
            if (request.method() == 'POST' && (params.type == 'moment' || params.type == 'answer' || params.type == 'customer')) {
                let data = {};
                const like = await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, user_id: session.get('user_id') }).first();
                if (like && like.id) {
                    data = await Database_1.default.from('likes').where({ relation_type_id: params.id }).update({ status: like.status ? 0 : 1, modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'), ip: request.ip() });
                }
                else {
                    data = await Database_1.default.table('likes').insert({ type: params.type, relation_type_id: params.id, user_id: session.get('user_id'), ip: request.ip() });
                }
                const dataLike = await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1, user_id: session.get('user_id') }).first();
                data = {
                    ...data,
                    like: dataLike && dataLike.id ? true : false,
                    likeNum: (await Database_1.default.from('likes').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
                    commentNum: (await Database_1.default.from('comments').where({ relation_type_id: params.id, type: params.type, status: 1 }).count('* as total'))[0].total || 0,
                };
                return response.json({ status: 200, message: "ok", data });
            }
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = EventController;
//# sourceMappingURL=EventController.js.map