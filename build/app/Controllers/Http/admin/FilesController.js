"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class FilesController {
    async index({ request, view, session }) {
        try {
            const all = request.all();
            const files = await Database_1.default.from('files').where({ status: 1 }).orderBy('id', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < files.length; index++) {
                files[index].created_at = (0, moment_1.default)(files[index].created_at).fromNow();
            }
            return view.render('admin/event/files', {
                data: {
                    title: '文件',
                    active: 'file',
                    files,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = FilesController;
//# sourceMappingURL=FilesController.js.map