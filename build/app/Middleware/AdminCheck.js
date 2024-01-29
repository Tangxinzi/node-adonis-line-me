"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
class AdminCheck {
    async handle({ request, response, session }, next) {
        try {
            const sign = session.get('adonis-cookie-sign');
            const cookie = request.cookie('adonis-cookie-sign', sign);
            if (cookie) {
                const verify = Jwt_1.default.verifyPublicKey(sign || '');
                await next();
            }
            else if (!cookie && request.url() != '/admin/login') {
                await next();
                return response.redirect().status(301).toRoute('admin/UsersController.login');
            }
            else {
                await next();
            }
        }
        catch (e) {
            console.log(e);
            response.abort('Not authenticated', 401);
        }
    }
}
exports.default = AdminCheck;
//# sourceMappingURL=AdminCheck.js.map