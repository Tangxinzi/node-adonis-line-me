import Database from '@ioc:Adonis/Lucid/Database';
import Moment from'moment';

export default class QuestionsController {
  public async index({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      const questions = await Database.rawQuery('select * from questions order by type desc')
      return view.render('admin.question.index', {
        data: {
          title: '创建问答',
          active: 'questions',
          questions: questions[0]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async create({ request, view, session }: HttpContextContract) {
    try {
      const all = request.all()
      return view.render('admin.question.create', {
        data: {
          title: '创建问答',
          active: 'questions'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public async edit({ params, view }: HttpContextContract) {
    const question = await Database.from('questions').where('id', params.id).first()
    return view.render('admin.question.edit', {
      data: {
        title: '创建问答',
        active: 'questions',
        question
      }
    })
  }

  public async save({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()

      if (!all.title || !all.description) {
        session.flash('error', { type: 'error', header: '创建失败', message: `标题或者描述内容不能为空，请重新填写。` })
        return response.redirect('back')
      }

      const id = await Database.table('questions').returning('id').insert({
        type: all.type || '',
        sex: all.sex || '',
        title: all.title || '',
        description: all.description || ''
      })

      session.flash('message', { type: 'success', header: '创建成功', message: `${ all.title }已创建，点击<a href="?id=${ id }">查看</a>内容。` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
      session.flash('message', { type: 'error', header: '提交失败', message: `捕获错误信息 ${ JSON.stringify(error) }。` })
    }
  }

  public async update({ request, response, session }: HttpContextContract) {
    try {
      const all = request.all()
      await Database.from('questions').where('id', all.id).update({ type: all.type, sex: all.sex, title: all.title, description: all.description })
      session.flash('message', { type: 'success', header: '更新成功', message: `${ all.title }已更新，点击<a href="?id=${ all.id }">查看</a>内容。` })
      return response.redirect('back')
    } catch (error) {
      console.log(error)
    }
  }
}
