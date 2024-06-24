"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
class SecuritiesController {
    async secCenter({ request, view }) {
        try {
            const security = await Database_1.default.from('security').orderBy('created_at', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < security.length; index++) {
                security[index].created_at = (0, moment_1.default)(security[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return view.render('admin/security/center', {
                data: {
                    title: '内容安全',
                    active: 'security',
                    subActive: 'security-center',
                    security
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = SecuritiesController;
//# sourceMappingURL=SecuritiesController.js.map