'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Jwt extends Orm_1.BaseModel {
    static sign(data) {
        return jsonwebtoken_1.default.sign(JSON.parse(data), Env_1.default.get('APP_KEY'));
    }
    static verify(token) {
        return jsonwebtoken_1.default.verify(token, Env_1.default.get('APP_KEY'));
    }
    static decode(token) {
        return jsonwebtoken_1.default.decode(token, Env_1.default.get('APP_KEY'));
    }
    static signPrivateKey(data) {
        try {
            return jsonwebtoken_1.default.sign(JSON.parse(data), fs_1.default.readFileSync(Application_1.default.publicPath('pem/private.key')), { algorithm: 'RS256' });
        }
        catch (e) {
            console.log(e);
        }
    }
    static verifyPublicKey(token) {
        try {
            return jsonwebtoken_1.default.verify(token, fs_1.default.readFileSync(Application_1.default.publicPath('pem/public.key')));
        }
        catch (e) {
            console.log(e);
        }
    }
    static decodeKey(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = Jwt;
module.exports = Jwt;
//# sourceMappingURL=Jwt.js.map