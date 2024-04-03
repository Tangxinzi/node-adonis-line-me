"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebCheck {
    async handle({ request, response, session }, next) {
        try {
            await next();
        }
        catch (e) {
            console.log(e);
            response.abort('Not authenticated', 401);
        }
    }
}
exports.default = WebCheck;
//# sourceMappingURL=WebCheck.js.map