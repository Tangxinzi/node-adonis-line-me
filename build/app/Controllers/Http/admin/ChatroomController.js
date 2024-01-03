'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const uuid_1 = require("uuid");
class ChatroomController {
    async index({ request, response, view, session }) {
        try {
            const chatroom = await Database_1.default.from('chatroom').orderBy('modified_at', 'desc');
            for (var i = 0; i < chatroom.length; i++) {
                chatroom[i].chat_users_id = chatroom[i].chat_users_id.split(',');
                chatroom[i]['chat_users'] = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').whereIn('user_id', chatroom[i].chat_users_id);
                chatroom[i]['created_at'] = (0, moment_1.default)(chatroom[i]['created_at']).format('YYYY-MM-DD HH:mm:ss');
                chatroom[i]['modified_at'] = (0, moment_1.default)(chatroom[i]['modified_at']).fromNow();
            }
            return view.render('admin/chatroom/index', {
                data: {
                    title: '聊天',
                    active: 'chatroom',
                    chatroom
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async edit({ params, request, response, view, session }) {
        try {
            var all = request.all();
            const chatroom = await Database_1.default.from('chatroom').where('chat_id', params.id).first();
            chatroom['users'] = await Database_1.default.from('users').whereIn('user_id', chatroom.chat_users_id.split(','));
            chatroom.chat_users_id = chatroom.chat_users_id.split(',');
            const users = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').whereIn('user_id', chatroom.chat_users_id);
            const chats = await Database_1.default.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id: params.id, status: 1 }).orderBy('created_at', 'asc');
            for (let index = 0; index < chats.length; index++) {
                const indexOf = chatroom.chat_users_id.indexOf(chats[index].user_id);
                if (indexOf != -1) {
                    chats[index].userinfo = users[indexOf];
                }
                chats[index].created_at = (0, moment_1.default)(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            chatroom['chats'] = chats;
            return view.render('admin/chatroom/edit', {
                data: {
                    title: `${chatroom.chat_name || ''} - 聊天`,
                    active: 'chatroom',
                    chatroom,
                    users
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async store({ request, response, view, session }) {
        try {
            const all = request.all();
            switch (all.button) {
                case 'chatroom':
                    if (all.users.split(',').length >= 2) {
                        const chat_id = (0, uuid_1.v4)();
                        await Database_1.default.table('chatroom').insert({ chat_id, chat_users_id: all.users });
                        session.flash('success', { type: 'success', header: '', message: `房间号「${all.id}」更新成功。` });
                    }
                    else {
                        session.flash('error', { type: 'error', header: '', message: `创建失败，房间需要 2 人以上，请插入多个 ID。` });
                    }
                    break;
                    return response.redirect('back');
                case 'messages':
                    if (all.user_id && all.content) {
                        await Database_1.default.table('messages').insert({ content: all.content, user_id: all.user_id });
                        session.flash('success', { type: 'success', header: '', message: `已为「${all.user_id}」推送消息。` });
                    }
                    else {
                        session.flash('error', { type: 'error', header: '', message: `推送消息失败，请检查。` });
                    }
                    return response.redirect('back');
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async update({ request, response, view, session }) {
        try {
            const all = request.all();
            if (all.chat_users_id.split(',').length >= 2) {
                await Database_1.default.from('chatroom').where('chat_id', all.id).update({
                    status: all.status,
                    chat_name: all.name,
                    chat_description: all.description,
                    chat_users_id: all.chat_users_id
                });
                session.flash('success', { type: 'success', header: '', message: `房间号「${all.id}」更新成功。` });
            }
            else {
                session.flash('error', { type: 'error', header: '', message: `创建失败，房间需要 2 人以上，请插入多个 ID。` });
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatroomController;
//# sourceMappingURL=ChatroomController.js.map