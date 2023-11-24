"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Check {
    async handle({ request, response, session }, next) {
        try {
            await next();
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = Check;
//# sourceMappingURL=Check.js.map