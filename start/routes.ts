/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.get('/user/wxa-login', 'api/UserController.wxaLogin')
  Route.get('/user/info', 'api/UserController.getUserinfo')
  Route.post('/user/info', 'api/UserController.updateUserinfo')
  Route.post('/user/change-type', 'api/UserController.changeType')
  Route.post('/user/field', 'api/UserController.updateUserField')
  Route.post('/user/custom/create', 'api/PublishesController.create')
  Route.get('/user/qrcode', 'api/UserController.qrcode')
  Route.get('/user/chat', 'api/UserController.chat')

  Route.get('/user/question', 'api/QuestionsController.index')
  Route.get('/user/question/lists', 'api/QuestionsController.questionLists')
  Route.get('/user/answer/lists', 'api/QuestionsController.answerLists')
  Route.get('/user/answer/introduce/lists', 'api/QuestionsController.introduceLists')
  Route.get('/user/question/show/:id', 'api/QuestionsController.show')
  Route.get('/user/question/answer/:id', 'api/QuestionsController.answer')
  Route.post('/user/question/answer/:id', 'api/QuestionsController.answer')

  Route.get('/user/moments', 'api/MomentsController.index')
  Route.get('/user/moment/show/:id', 'api/MomentsController.show')
  Route.get('/user/moment/lists', 'api/MomentsController.lists')
  Route.post('/user/moment/create', 'api/MomentsController.create')

  Route.get('/customs', 'api/CustomerController.index')
  Route.get('/customer/userinfo/:id', 'api/CustomerController.customerInfo')
  Route.post('/customer/field/update/:id', 'api/CustomerController.updateCustomerField')
  Route.get('/customer/userlist', 'api/CustomerController.customerList')
  Route.get('/customer/userlist/show/:id', 'api/CustomerController.customerShow')
  Route.post('/customer/create', 'api/CustomerController.createCustomerinfo')
  Route.post('/customer/create/relation', 'api/CustomerController.relationCustomerinfo')
  Route.post('/customer/delete/:id', 'api/CustomerController.deleteCustomer')

  Route.post('/file/upload', 'api/FilesController.upload')

  Route.get('/comments/my', 'api/CommentsController.my')
  Route.post('/comments/create', 'api/CommentsController.create')

  Route.get('/event/descovery', 'api/EventController.descovery')
  Route.get('/event/descovery/:type/:id', 'api/EventController.type')
  Route.post('/event/like/:id', 'api/EventController.like')
}).prefix('/api').middleware('apicheck')

Route.group(() => {
  Route.get('/users', 'admin/UsersController.index').as('users')
  Route.get('/customers', 'admin/CustomersController.index').as('customers')
  Route.post('/customers/field', 'admin/CustomersController.field')

  Route.get('/event/descovery', 'admin/EventController.descovery')
  Route.post('/event/descovery/:type', 'admin/EventController.dataType')

  Route.get('/files', 'admin/FilesController.index')

  Route.get('/chatroom', 'admin/ChatroomController.index')
  Route.get('/chatroom/edit/:id', 'admin/ChatroomController.edit').as('admin.chatroom.edit')
  Route.post('/chatroom/store', 'admin/ChatroomController.store')
  Route.post('/chatroom/update', 'admin/ChatroomController.update')

  Route.get('/questions', 'admin/QuestionsController.index').as('questions')
  Route.get('/questions/answer', 'admin/QuestionsController.answer')
  Route.get('/questions/edit/:id', 'admin/QuestionsController.edit')
  Route.get('/questions/create', 'admin/QuestionsController.create')
  Route.post('/questions/save', 'admin/QuestionsController.save')
  Route.post('/questions/update', 'admin/QuestionsController.update')
}).prefix('/admin')

Route.group(() => {
  Route.get('/designer', 'land/admin/DesignerController.index')
  Route.get('/designer/create', 'land/admin/DesignerController.create')
  Route.get('/designer/show/:id', 'land/admin/DesignerController.show')
  Route.get('/designer/edit/:id', 'land/admin/DesignerController.edit')
  Route.post('/designer/save', 'land/admin/DesignerController.save')

  Route.get('/work', 'land/admin/WorkController.index')
  Route.get('/work/create', 'land/admin/WorkController.create')
  Route.get('/work/show/:id', 'land/admin/WorkController.show')
  Route.get('/work/edit/:id', 'land/admin/WorkController.edit')
  Route.post('/work/save', 'land/admin/WorkController.save')

  Route.get('/article', 'land/admin/ArticleController.index')
  Route.get('/article/create', 'land/admin/ArticleController.create')
  Route.get('/article/show/:id', 'land/admin/ArticleController.show')
  Route.get('/article/edit/:id', 'land/admin/ArticleController.edit')
  Route.post('/article/save', 'land/admin/ArticleController.save')
}).prefix('/land')
