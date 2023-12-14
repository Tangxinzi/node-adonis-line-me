"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class DataController {
    async index({ request, response, view, session }) {
        try {
            const all = request.all(), datas = await Database_1.default.table('datas');
            return view.render('admin/datas/index', {
                data: {
                    title: '数据',
                    active: 'datas',
                    datas,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = DataController;
//# sourceMappingURL=DataController.js.map