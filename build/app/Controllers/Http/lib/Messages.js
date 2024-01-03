"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
function push(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await Database_1.default.table('messages').insert({ content: data.content, user_id: data.user_id });
            if (id) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    push
};
//# sourceMappingURL=Messages.js.map