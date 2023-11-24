"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class CommentsController {
    async create({ request, response, session }) {
        try {
            const all = request.all();
            const id = await Database_1.default.table('comments').insert({ type: all.type, comment_content: all.comment_content, relation_type_id: all.id, user_id: session.get('user_id'), ip: request.ip() });
            if (id.length) {
                response.json({ status: 200, message: "ok" });
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
    async my({ request, response, session }) {
        try {
            const all = request.all();
            const comments = await Database_1.default.from('comments').select('*').where({ user_id: session.get('user_id') });
            for (let index = 0; index < comments.length; index++) {
                comments[index].created_at = (0, moment_1.default)(comments[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            response.json({ status: 200, message: "ok", data: comments });
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
exports.default = CommentsController;
//# sourceMappingURL=CommentsController.js.map