"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
class QuestionsController {
    async index({ request, view, session }) {
        try {
            const all = request.all();
            const questions = await Database_1.default.rawQuery('select * from questions order by type desc');
            return view.render('admin/question/index', {
                data: {
                    title: '问答',
                    active: 'questions',
                    questions: questions[0]
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async answer({ params, request, view, session }) {
        try {
            const all = request.all();
            const answer = await Database_1.default.from('answer').where('type', params.type || 0).orderBy('id', 'desc').forPage(request.input('page', 1), 20);
            for (let index = 0; index < answer.length; index++) {
                const user = await Database_1.default.from('users').select('user_id', 'nickname', 'avatar_url').where('user_id', answer[index].user_id).first();
                const question = await Database_1.default.from('questions').select('title').where('id', answer[index].relation_question_id).first() || {};
                answer[index].title = question.title || '';
                answer[index].userinfo = user;
                answer[index].photos = answer[index].photos ? JSON.parse(answer[index].photos) : [];
                answer[index].created_at = (0, moment_1.default)(answer[index].created_at).format('YYYY-MM-DD hh:mm:ss');
                answer[index].modified_at = (0, moment_1.default)(answer[index].modified_at).format('YYYY-MM-DD hh:mm:ss');
            }
            return view.render('admin/question/answer', {
                data: {
                    title: '问答',
                    active: params.type == '1' ? 'introduction' : 'answer',
                    answer,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async create({ request, view, session }) {
        try {
            const all = request.all();
            return view.render('admin/question/create', {
                data: {
                    title: '创建问答',
                    active: 'questions'
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async edit({ params, view }) {
        const question = await Database_1.default.from('questions').where('id', params.id).first();
        return view.render('admin/question/edit', {
            data: {
                title: '编辑问答',
                active: 'questions',
                question
            }
        });
    }
    async save({ request, response, session }) {
        try {
            const all = request.all();
            if (!all.title || !all.description) {
                session.flash('error', { type: 'error', header: '创建失败', message: `标题或者描述内容不能为空，请重新填写。` });
                return response.redirect('back');
            }
            const id = await Database_1.default.table('questions').returning('id').insert({
                type: all.type || '',
                sex: all.sex || '',
                title: all.title || '',
                description: all.description || ''
            });
            session.flash('message', { type: 'success', header: '创建成功', message: `${all.title}已创建，点击<a href="?id=${id}">查看</a>内容。` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
            session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${JSON.stringify(error)}。` });
        }
    }
    async update({ request, response, session }) {
        try {
            const all = request.all();
            await Database_1.default.from('questions').where('id', all.id).update({ type: all.type, sex: all.sex, title: all.title, description: all.description });
            session.flash('message', { type: 'success', header: '更新成功', message: `${all.title}已更新，点击<a href="?id=${all.id}">查看</a>内容。` });
            return response.redirect('back');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = QuestionsController;
//# sourceMappingURL=QuestionsController.js.map