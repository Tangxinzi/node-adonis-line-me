'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const uuid_1 = require("uuid");
class ChatsroomController {
    async index({ request, response, view, session }) {
        try {
            const chatsroom = await Database_1.default.from('chatsroom').orderBy('modified_at', 'desc');
            for (var i = 0; i < chatsroom.length; i++) {
                chatsroom[i].chat_users = [];
                chatsroom[i].chat_users[0] = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', chatsroom[i].chat_user_id).first() || {};
                chatsroom[i].chat_users[1] = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', chatsroom[i].chat_participant_users_id).first() || {};
                chatsroom[i]['created_at'] = (0, moment_1.default)(chatsroom[i]['created_at']).format('YYYY-MM-DD HH:mm:ss');
                chatsroom[i]['modified_at'] = (0, moment_1.default)(chatsroom[i]['modified_at']).fromNow();
            }
            return view.render('admin/chatsroom/index', {
                data: {
                    title: '聊天',
                    active: 'chatsroom',
                    chatsroom
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
            const chatsroom = await Database_1.default.from('chatsroom').where('chat_id', params.id).first();
            chatsroom['users'] = await Database_1.default.from('users').whereIn('user_id', [chatsroom.chat_user_id, chatsroom.chat_participant_users_id]);
            chatsroom.chat_users_id = [chatsroom.chat_user_id, chatsroom.chat_participant_users_id];
            const users = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').whereIn('user_id', chatsroom.chat_users_id);
            const chats = await Database_1.default.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id: params.id, status: 1 }).orderBy('created_at', 'asc');
            for (let index = 0; index < chats.length; index++) {
                const indexOf = chatsroom.chat_users_id.indexOf(chats[index].user_id);
                if (indexOf != -1) {
                    chats[index].userinfo = users[indexOf];
                }
                chats[index].created_at = (0, moment_1.default)(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            chatsroom.chats = chats;
            return view.render('admin/chatsroom/edit', {
                data: {
                    title: `${chatsroom.chat_name || ''}聊天`,
                    active: 'chatsroom',
                    chatsroom,
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
                case 'chatsroom':
                    const chat_id = (0, uuid_1.v4)();
                    await Database_1.default.table('chatsroom').insert({ chat_id, chat_user_id: all.chat_user_id, chat_participant_users_id: all.chat_participant_users_id });
                    session.flash('success', { type: 'success', header: '', message: `房间号「${all.id}」更新成功。` });
                    return response.redirect('back');
                    break;
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
            const all = request.all(), users = all.chat_users_id.split(',');
            if (users.length == 2) {
                await Database_1.default.from('chatsroom').where('chat_id', all.id).update({
                    status: all.status,
                    chat_name: all.name || null,
                    chat_description: all.description || null,
                    chat_user_id: users[0],
                    chat_participant_users_id: users[1],
                });
                session.flash('success', { type: 'success', header: '更新成功', message: `房间号「${all.id}」更新成功。` });
            }
            else {
                session.flash('error', { type: 'error', header: '更新失败', message: `更新失败，请检查填写 ID。` });
            }
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatsroomController;
//# sourceMappingURL=ChatsroomController.js.map