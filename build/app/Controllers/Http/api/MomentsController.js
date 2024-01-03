"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
class MomentsController {
    async index({ request, response }) {
        try {
            const all = request.all();
            const moments = await Database_1.default.from('moments').select('moments.id', 'moments.user_id', 'moments.content', 'moments.photos', 'moments.created_at', 'users.wechat_open_id', 'users.nickname', 'users.avatar_url', 'users.sex', 'users.birthday', 'users.ip').join('users', 'moments.user_id', '=', 'users.wechat_open_id').orderBy('moments.created_at', 'desc');
            for (let index = 0; index < moments.length; index++) {
                moments[index].data_type = 'image';
                moments[index].photos = moments[index].photos ? JSON.parse(moments[index].photos) : [];
                moments[index].created_at = (0, moment_1.default)(moments[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            response.json({
                status: 200,
                message: "ok",
                data: moments
            });
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
    async lists({ request, response, session }) {
        try {
            const all = request.all();
            const moments = await Database_1.default.from('moments').where('user_id', all.user_id || session.get('user_id')).orderBy('created_at', 'desc');
            for (let index = 0; index < moments.length; index++) {
                moments[index].data_type = 'image';
                moments[index].photos = moments[index].photos ? JSON.parse(moments[index].photos) : [];
                moments[index].created_at = (0, moment_1.default)(moments[index].created_at).format('YYYY-MM-DD HH:mm:ss');
                moments[index].modified_at = (0, moment_1.default)(moments[index].modified_at).format('YYYY-MM-DD HH:mm:ss');
            }
            response.json({
                status: 200,
                message: "ok",
                data: moments
            });
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
    async show({ params, request, response }) {
        try {
            const all = request.all();
            const moment = await Database_1.default.from('moments').where('id', params.id).first();
            moment.data_type = 'image';
            moment.photos = moment.photos ? JSON.parse(moment.photos) : [];
            moment.created_at = (0, moment_1.default)(moment.created_at).format('YYYY-MM-DD HH:mm:ss');
            moment.modified_at = (0, moment_1.default)(moment.modified_at).format('YYYY-MM-DD HH:mm:ss');
            response.json({
                status: 200,
                message: "ok",
                data: moment
            });
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
    async create({ request, response, session }) {
        try {
            const all = request.all();
            if (!all.content && all.photos.length == 0) {
                return response.json({ status: 400, message: "error", data: '' });
            }
            let id = await Database_1.default.table('moments').returning('id').insert({
                user_id: session.get('user_id'),
                content: all.content,
                photos: JSON.stringify(all.photos || []),
                ip: request.ip()
            });
            if (id[0]) {
                return response.json({ status: 200, message: "ok" });
            }
            else {
                return response.json({
                    status: 500,
                    message: "internalServerError",
                    data: 'err'
                });
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
exports.default = MomentsController;
//# sourceMappingURL=MomentsController.js.map