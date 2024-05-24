"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class TrackingController {
    async informationImprovementProcess({ request, response, session }) {
        try {
            let all = request.all();
            if (all.type == 'users' && all.dataset.user) {
                all.updateData = {
                    type: all.type,
                    avatar_url: all.dataset.user.avatar_url,
                    nickname: all.dataset.user.nickname,
                    school: all.dataset.user.school,
                    company: all.dataset.user.company,
                    job_title: all.dataset.user.job_title,
                    work: JSON.stringify(all.dataset.user.work),
                    work_code: all.work ? all.dataset.user.work.code : '',
                    height: all.dataset.user.height,
                    sex: all.dataset.user.sex,
                    birthday: all.dataset.user.birthday,
                    photos: JSON.stringify(all.dataset.user.photos || []),
                    ip: request.ip(),
                    modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')
                };
                await Database_1.default.from('users').where('user_id', session.get('user_id')).update(all.updateData);
            }
            delete all.dataset;
            const id = await Database_1.default.table('tracking').insert({ type: 'information-improvement-process', user_id: session.get('user_id'), content: JSON.stringify(all) });
            if (id.length) {
                return response.json({ status: 200, message: "ok", data: all.dataset });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = TrackingController;
//# sourceMappingURL=TrackingController.js.map