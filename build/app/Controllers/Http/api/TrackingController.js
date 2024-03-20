"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class TrackingController {
    async publicUserCustomer({ request, response, session }) {
        try {
            const all = request.all();
            const id = await Database_1.default.table('tracking').insert({ type: 'public-user-customer', user_id: session.get('user_id'), content: JSON.stringify(all) });
            if (id.length) {
                response.json({ status: 200, message: "ok" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = TrackingController;
//# sourceMappingURL=TrackingController.js.map