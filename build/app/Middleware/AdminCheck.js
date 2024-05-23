"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class AdminCheck {
    async handle({ request, response, session }, next) {
        try {
            const sign = session.get('adonis-cookie-sign');
            if (sign) {
                const verificationTotal = (await Database_1.default.from('verification').where({ is_verified: 0 }).count('* as total'))[0].total;
                response.plainCookie('dataset', {
                    verificationTotal
                }, {
                    httpOnly: false,
                });
                await next();
            }
            else if (!sign && request.url() != '/admin/login') {
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