"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminCheck {
    async handle({ request, response, session }, next) {
        try {
            const sign = session.get('adonis-cookie-sign');
            await next();
        }
        catch (e) {
            console.log(e);
            response.abort('Not authenticated', 401);
        }
    }
}
exports.default = AdminCheck;
//# sourceMappingURL=AdminCheck.js.map