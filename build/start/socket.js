"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const Jwt_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Jwt"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Ws"));
Ws_1.default.boot();
const getChatroom = async (user_id) => {
    try {
        const chatroom = await Database_1.default.from('chatroom').whereILike('chat_users_id', '%' + user_id + '%').where({ status: 1 }).orderBy('modified_at', 'desc');
        for (let index = 0; index < chatroom.length; index++) {
            chatroom[index].unread = await countUnread(user_id, chatroom[index].chat_id);
            chatroom[index].created_at = (0, moment_1.default)(chatroom[index].created_at).format('YYYY-MM-DD');
            chatroom[index].modified_at = (0, moment_1.default)(chatroom[index].modified_at).fromNow();
            chatroom[index].message = await Database_1.default.from('chats').select('user_id', 'chat_content_type', 'chat_content').where({ chat_id: chatroom[index].chat_id, status: 1 }).orderBy('created_at', 'desc').first();
            chatroom[index].chat_users_id = chatroom[index].chat_users_id.split(',');
            chatroom[index].user = await new Promise((resolve) => {
                chatroom[index].chat_users_id.map(async (item, key) => {
                    if (item != user_id) {
                        chatroom[index].user = await Database_1.default.from('users').select('type', 'avatar_url', 'nickname').where({ user_id: item }).first();
                        resolve(chatroom[index].user);
                    }
                });
            });
        }
        return chatroom;
    }
    catch (error) {
        console.log(error);
    }
};
const getChatsMessage = async (data, chat_id) => {
    try {
        const chatroom = await Database_1.default.from('chatroom').where({ chat_id, status: 1 }).first();
        chatroom.chat_users_id = chatroom.chat_users_id.split(',');
        const users = (await Database_1.default.rawQuery(`
      SELECT type, nickname, avatar_url from users WHERE user_id in (${chatroom.chat_users_id.map(str => `'${str}'`).join(',')}) order by FIELD(user_id, ${chatroom.chat_users_id.map(str => `'${str}'`).join(',')})
    `))[0];
        const chats = await Database_1.default.from('chats').select('id', 'chat_id', 'user_id', 'chat_content', 'chat_content_type', 'created_at').where({ chat_id, status: 1 }).orderBy('created_at', 'asc');
        for (let index = 0; index < chats.length; index++) {
            const indexOf = chatroom.chat_users_id.indexOf(chats[index].user_id);
            if (indexOf != -1) {
                chats[index].userinfo = users[indexOf];
            }
            if (chats[index].chat_content_type == 'customer') {
                chats[index].chat_content_type = 'text';
                const customer = await Database_1.default.from('customer').select('relation_user_id', 'relation_log_id').where({ id: chats[index].chat_content }).first() || {};
                if (customer.relation_log_id) {
                    const customer_log = await Database_1.default.from('customer_log').select('avatar_url', 'nickname').where('id', customer.relation_log_id).first();
                    chats[index].chat_content = `Hi，我想认识您介绍的好友「${customer_log.nickname}」😄`;
                }
                else if (customer.relation_user_id) {
                    const user = await Database_1.default.from('users').select('*').where('user_id', customer.relation_user_id).first();
                    chats[index].chat_content = `Hi，我想认识您介绍的好友「${user.nickname}」😄`;
                }
            }
            if (chats[index].chat_content_type == 'share-customer') {
                const customer = await Database_1.default.from('customer').select('id', 'relation_user_id', 'relation_log_id').where({ id: chats[index].chat_content }).first();
                if (customer.relation_log_id) {
                    chats[index].chat_content = await Database_1.default.from('customer_log').select('avatar_url', 'nickname').where('id', customer.relation_log_id).first();
                    chats[index].chat_content.id = customer.id;
                }
                else if (customer.relation_user_id) {
                    chats[index].chat_content = await Database_1.default.from('users').select('*').where('user_id', customer.relation_user_id).first();
                    chats[index].chat_content.id = customer.id;
                }
            }
            chats[index].created_at = (0, moment_1.default)(chats[index].created_at).format('YYYY-MM-DD HH:mm:ss');
        }
        return {
            users,
            lists: chats
        };
    }
    catch (error) {
        console.log(error);
    }
};
const lastJoinChat = async (user, chat_id) => {
    try {
        const chat_log = await Database_1.default.from('chats_log').where({ chat_id, user_id: user.user_id }).first();
        if (chat_log) {
            await Database_1.default.from('chats_log').where({ chat_id, user_id: user.user_id }).update({ last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
        }
        else {
            await Database_1.default.table('chats_log').insert({ chat_id, user_id: user.user_id, last_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
        }
    }
    catch (error) {
        console.log(error);
    }
};
const countUnread = async (user_id, chat_id) => {
    try {
        const chat_log = await Database_1.default.from('chats_log').whereIn('user_id', [user_id]).where({ chat_id, user_id }).first();
        if (chat_log) {
            const count = await Database_1.default.from('chats').where({ chat_id }).where('created_at', '>', chat_log.last_at).count('* as total');
            return count[0].total || 0;
        }
    }
    catch (error) {
        console.log(error);
    }
};
const getMessages = async (user_id) => {
    try {
        const message = await Database_1.default.from('messages').select('content', 'created_at').where({ user_id, status: 1 }).orderBy('created_at', 'desc').first() || {};
        const messages_log = await Database_1.default.from('messages_log').where({ user_id }).first() || {};
        const count = await Database_1.default.from('messages').where({ user_id }).where('created_at', '>', messages_log.last_at).count('* as total');
        message.created_at = message.created_at ? (0, moment_1.default)(message.created_at).fromNow() : '';
        return {
            notice: {
                ...message,
                unread: count[0].total || 0
            },
        };
    }
    catch (error) {
        console.log(error);
    }
};
Ws_1.default.io.on('connection', async (socket) => {
    try {
        const { sign, chat_id } = socket.handshake.query;
        const user = await Database_1.default.from('users').where('id', Jwt_1.default.verifyPublicKey(sign)).first();
        socket.on('onlineChatroomUserID', (user_id) => {
            socket.join(user_id);
        });
        socket.on('joinChatroom', (room) => {
            socket.join(room);
        });
        socket.on('chatroom', async (data) => {
            socket.emit('chatroom list', {
                messages: await getMessages(user.user_id),
                chatroom: await getChatroom(user.user_id)
            });
        }, socket.on('chat list', async (room, data) => {
            if (chat_id) {
                await lastJoinChat(user, chat_id);
                const chats = await getChatsMessage(data, chat_id);
                socket.to(room).emit('messages', chats);
                socket.broadcast.to(room).emit('messages', chats);
            }
        }, socket.on('chat leave', async () => {
            if (chat_id) {
                await lastJoinChat(user, chat_id);
            }
        }, socket.on('send message', async (room, data) => {
            if (chat_id) {
                await Database_1.default.from('chatroom').where({ chat_id, status: 1 }).update({ modified_at: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss') });
                await lastJoinChat(user, chat_id);
                await Database_1.default.table('chats').insert({ chat_id, user_id: user.user_id, chat_content: data.message, chat_content_type: data.type, chat_ip: socket.handshake.headers['x-real-ip'] });
                const chats = await getChatsMessage(data, chat_id);
                socket.to(room).emit('messages lists', chats);
                socket.broadcast.to(room).emit('messages lists', chats);
                const chatroom = await Database_1.default.from('chatroom').where({ chat_id, status: 1 }).first();
                chatroom.chat_users_id = chatroom.chat_users_id.split(',');
                for (let index = 0; index < chatroom.chat_users_id.length; index++) {
                    const user_id = chatroom.chat_users_id[index];
                    socket.broadcast.to(user_id).emit('chatroom list', {
                        messages: await getMessages(user_id),
                        chatroom: await getChatroom(user_id)
                    });
                }
            }
        }))));
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=socket.js.map