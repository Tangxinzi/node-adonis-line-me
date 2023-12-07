"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminCheck {
    async handle({ request, response, session }, next) {
        try {
            const sign = session.get('adonis-cookie-sign');
            if (sign) {
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