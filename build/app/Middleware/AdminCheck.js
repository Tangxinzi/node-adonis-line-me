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
                const { total } = (await Database_1.default.from('verification').where({ is_verified: 0 }).count('* as total'))[0];
                response.plainCookie('dataset', { verificationTotal: total }, { httpOnly: false });
            }
            else {
            }
            await next();
        }
        catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = AdminCheck;
//# sourceMappingURL=AdminCheck.js.map