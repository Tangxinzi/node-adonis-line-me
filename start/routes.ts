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
  Route.get('/user/custom/public/user-list', 'api/DataController.customerPublicUserList')
  Route.post('/user/custom/create', 'api/PublishesController.create')
  Route.get('/user/qrcode', 'api/UserController.qrcode')

  Route.get('/user/question', 'api/QuestionsController.index')
  Route.get('/user/question/lists', 'api/QuestionsController.lists')
  Route.get('/user/question/show/:id', 'api/QuestionsController.show')
  Route.get('/user/question/answer/:id', 'api/QuestionsController.answer')
  Route.post('/user/question/answer/:id', 'api/QuestionsController.answer')

  Route.get('/user/moments', 'api/MomentsController.index')
  Route.get('/user/moment/lists', 'api/MomentsController.lists')
  Route.post('/user/moment/create', 'api/MomentsController.create')

  Route.post('/customer/info', 'api/CustomerController.updateCustomerinfo')

  Route.get('/data/index', 'api/DataController.index')

  Route.post('/file/upload', 'api/FilesController.upload')
}).prefix('/api').middleware('apicheck')

Route.group(() => {
  Route.get('/users', 'admin/UsersController.index').as('users')
  Route.get('/customers', 'admin/CustomersController.index').as('customers')

  Route.get('/questions', 'admin/QuestionsController.index').as('questions')
  Route.get('/questions/edit/:id', 'admin/QuestionsController.edit')
  Route.get('/questions/create', 'admin/QuestionsController.create')
  Route.post('/questions/save', 'admin/QuestionsController.save')
  Route.post('/questions/update', 'admin/QuestionsController.update')
}).prefix('/admin')
