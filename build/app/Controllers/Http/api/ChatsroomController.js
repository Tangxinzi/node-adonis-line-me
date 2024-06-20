"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
class ChatsroomController {
    async chat({ request, response, session }) {
        try {
            let all = request.all(), chat_id = null;
            if (session.get('user_id') == all.user_id) {
                return response.json({
                    status: 500,
                    message: "internalServerError",
                    data: 'Unable to chat with oneself'
                });
            }
            const users = await Database_1.default.from('users').whereIn('user_id', [session.get('user_id'), all.user_id]).where('status', 1);
            if (users.length != 2) {
                return response.json({
                    status: 500,
                    message: "internalServerError",
                    data: 'chat user_id error'
                });
            }
            const chatroom = await Database_1.default.from('chatsroom').where({ chat_user_id: session.get('user_id'), chat_participant_users_id: all.user_id, status: 1 }).orWhere({ chat_user_id: all.user_id, chat_participant_users_id: session.get('user_id'), status: 1 }).first() || {};
            if (chatroom.id) {
                chat_id = chatroom.chat_id;
            }
            else {
                chat_id = (0, uuid_1.v4)();
                await Database_1.default.table('chatsroom').insert({ chat_id, chat_user_id: session.get('user_id'), chat_participant_users_id: all.user_id, type: users[0].type });
            }
            return response.json({
                status: 200,
                message: "ok",
                data: {
                    chat_id
                }
            });
        }
        catch (error) {
            console.log(error);
            return response.json({
                status: 500,
                message: "internalServerError"
            });
        }
    }
    async send({ request, response, session }) {
        try {
            const all = request.all();
            const chatroom = await Database_1.default.from('chatsroom').where({ chat_id: all.chat_id, status: 1, chat_user_id: session.get('user_id') }).orWhere({ chat_id: all.chat_id, status: 1, chat_participant_users_id: session.get('user_id') }).first();
            console.log(chatroom);
            if (chatroom.id) {
                await Database_1.default.from('chatsroom').where({ chat_id: chatroom.chat_id, status: 1 }).update({ modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                await Database_1.default.from('chats_log').where({ chat_id: chatroom.chat_id, user_id: session.get('user_id') }).update({ last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                const id = await Database_1.default.table('chats').insert({ chat_id: chatroom.chat_id, user_id: session.get('user_id'), chat_content: all.chat_content, chat_content_type: all.chat_content_type, chat_ip: request.ip() });
                return response.json({
                    status: 200,
                    message: "ok",
                    data: id
                });
            }
            return response.json({
                status: 500,
                message: "error"
            });
        }
        catch (error) {
            console.log(error);
            response.json({
                status: 500,
                message: "ok",
                data: error
            });
        }
    }
    async messages({ request, response, session }) {
        try {
            const all = request.all(), user_id = session.get('user_id');
            const messages = await Database_1.default.from('messages').where({ user_id, status: 1 }).orderBy('created_at', 'desc').forPage(request.input('page', 1), 20);
            const messages_log = await Database_1.default.from('messages_log').where({ user_id }).first() || {};
            if (messages_log.id) {
                await Database_1.default.from('messages_log').where({ user_id }).update({ last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            else {
                await Database_1.default.table('messages_log').insert({ user_id, last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
            }
            for (let index = 0; index < messages.length; index++) {
                messages[index].created_at = (0, moment_1.default)(messages[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            return response.json({
                status: 200,
                message: "ok",
                data: messages
            });
        }
        catch (error) {
            console.log(error);
            response.json({
                status: 500,
                message: "ok",
                data: error
            });
        }
    }
}
exports.default = ChatsroomController;
//# sourceMappingURL=ChatsroomController.js.map