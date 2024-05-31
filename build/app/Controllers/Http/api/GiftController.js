"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class GiftController {
    async rewardVideos({ request, response, session }) {
        try {
            const all = request.all(), gift = await Database_1.default.from('reward-gift').where({ user_id: session.get('user_id') }).orderBy('created_at');
            if (gift.length == 0) {
                const data = await Database_1.default.table('reward-gift').insert({
                    user_id: session.get('user_id'),
                    type: 'video',
                    tag: all.vip.type,
                    content: all.vip.name + ' - ' + all.vip.tag,
                    status: 1,
                    ip: request.ip()
                });
                return response.json({ status: 200, message: "ok", data: data[0] });
            }
            return response.json({ status: 200, message: "ok", data: gift });
        }
        catch (error) {
            console.log(error);
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = GiftController;
//# sourceMappingURL=GiftController.js.map