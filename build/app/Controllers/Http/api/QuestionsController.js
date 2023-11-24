"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class QuestionsController {
    async index({ request, response }) {
        try {
            let all = request.all(), _answer = [[], [], []];
            const answer = (await Database_1.default.rawQuery("select questions.type, questions.title, questions.description, answer.content, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.user_id = :user_id order by type asc;", {
                user_id: all.openid
            }))[0];
            for (let index = 0; index < answer.length; index++) {
                switch (answer[index].type) {
                    case '0':
                        _answer[0].push(answer[index]);
                        break;
                    case '1':
                        _answer[1].push(answer[index]);
                        break;
                    case '2':
                        _answer[2].push(answer[index]);
                        break;
                }
            }
            response.json({
                status: 200,
                message: "ok",
                data: _answer
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async questionLists({ request, response, session }) {
        try {
            const all = request.all();
            const answer = await Database_1.default.from('answer').select('relation_question_id').where({ user_id: session.get('user_id') });
            if (answer.length) {
                let answerString = answer[0].relation_question_id;
                for (let index = 1; index < answer.length; index++)
                    answerString += ', ' + (answer[index].id || 0);
                var rawQuerySql = "SELECT * FROM questions where id not in (" + answerString + ") ORDER BY RAND() LIMIT 6;";
            }
            else {
                var rawQuerySql = "SELECT * FROM questions ORDER BY RAND() LIMIT 6;";
            }
            const questions = (await Database_1.default.rawQuery(rawQuerySql, {
                user_id: session.get('user_id')
            }))[0];
            response.json({
                status: 200,
                message: "ok",
                data: questions
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async answerLists({ request, response, session }) {
        try {
            const all = request.all();
            const _answer = [[], [], []];
            const answer = (await Database_1.default.rawQuery("select questions.id as qid, questions.type, questions.title, questions.description, answer.content, answer.id as id, answer.user_id from answer left outer join questions on answer.relation_question_id = questions.id where answer.type = 0 and answer.user_id = :user_id order by type asc;", {
                user_id: session.get('user_id')
            }))[0];
            for (let index = 0; index < answer.length; index++) {
                switch (answer[index].type) {
                    case '0':
                        _answer[0].push(answer[index]);
                        break;
                    case '1':
                        _answer[1].push(answer[index]);
                        break;
                    case '2':
                        _answer[2].push(answer[index]);
                        break;
                }
            }
            response.json({
                status: 200,
                message: "ok",
                data: _answer
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async introduceLists({ request, response, session }) {
        try {
            const all = request.all();
            const introduces = await Database_1.default.from('answer').where({ type: 1, status: 1, user_id: session.get('user_id') });
            for (let index = 0; index < introduces.length; index++) {
                introduces[index].created_at = (0, moment_1.default)(introduces[index].created_at).format('YYYY-MM-DD HH:mm:ss');
            }
            response.json({
                status: 200,
                message: "ok",
                data: introduces
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async show({ params, request, response, session }) {
        try {
            const all = request.all();
            const question = await Database_1.default.from('questions').where('id', params.id).first();
            let answer = await Database_1.default.from('answer').where({ relation_question_id: params.id, user_id: session.get('user_id') }).first();
            question.content = answer ? answer.content : '';
            question.photos = answer ? JSON.parse(answer.photos) : [];
            response.json({
                status: 200,
                message: "ok",
                data: question
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async answer({ params, request, response, session }) {
        try {
            const all = request.all();
            if (request.method() == 'GET') {
                var question = await Database_1.default.from('answer').where({ id: params.id, user_id: session.get('user_id') }).first();
                question.userinfo = await Database_1.default.from('users').where({ user_id: session.get('user_id') }).first();
                question.created_at = (0, moment_1.default)(question.created_at).fromNow();
                question = {
                    ...question,
                    ...await Database_1.default.from('questions').select('title').where('id', question.relation_question_id).first()
                };
                question.photos = JSON.parse(question.photos || '[]');
                response.json({ status: 200, message: "ok", data: question });
            }
            if (request.method() == 'POST') {
                if (params.id == 'type') {
                    const id = await Database_1.default.table('answer').returning('id').insert({
                        type: 1,
                        introduce_name: all.name || '',
                        user_id: session.get('user_id') || all.openid || '',
                        introduce_openid: all.introduce_openid || '',
                        content: all.content || '',
                        relation_question_id: '',
                        photos: JSON.stringify(all.photos || []),
                        ip: request.ip()
                    });
                    return response.json({ status: 200, message: "ok", data: id });
                }
                if (params.id == 'recommend') {
                    var result = await Database_1.default.from('answer').where({ id: all.id, type: 1, user_id: session.get('user_id') }).update({ recommend: all.recommend ? 0 : 1 });
                    return response.json({ status: 200, message: "ok", data: result });
                }
                const id = await Database_1.default.table('answer').returning('id').insert({
                    user_id: session.get('user_id'),
                    relation_question_id: params.id,
                    content: all.content || '',
                    photos: JSON.stringify(all.photos || []),
                });
                response.json({ status: 200, message: "ok", data: id });
            }
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = QuestionsController;
//# sourceMappingURL=QuestionsController.js.map