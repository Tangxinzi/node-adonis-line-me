"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class ApiAdminCheck {
    async handle({ request, response, session }, next) {
        try {
            const userSign = request.header('User-Sign');
            if (userSign) {
                const user = await Database_1.default.from('users').where('id', Jwt_1.default.verifyPublicKey(userSign || '')).first() || {};
                const examine = await Database_1.default.from('users_operates').where({ user_id: user.user_id, status: 1 }).where('type', 'like', '%examine%').first() ? true : false;
                if (examine) {
                    session.put('user_id', user.user_id);
                    await next();
                }
            }
        }
        catch (e) {
            console.log(e);
            response.abort('Not authenticated', 401);
        }
    }
}
exports.default = ApiAdminCheck;
//# sourceMappingURL=ApiAdminCheck.js.map