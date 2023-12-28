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
  Route.post('/user/find/:type', 'api/UserController.findUser')
  Route.post('/user/change-type', 'api/UserController.changeType')
  Route.post('/user/field', 'api/UserController.updateUserField')
  Route.post('/user/recommend/home', 'api/UserController.recommendHome')
  Route.post('/user/custom/create', 'api/PublishesController.create')
  Route.get('/user/qrcode', 'api/UserController.qrcode')
  Route.get('/user/chat', 'api/UserController.chat')
  Route.get('/user/chat/send', 'api/UserController.chatSend')
  Route.get('/user/location', 'api/UserController.location')
  Route.get('/user/verification', 'api/UserController.verification')
  Route.get('/user/verification/review/:table/:field', 'api/UserController.review')
  Route.get('/user/authentication/verification', 'api/UserController.authenticationVerification')
  Route.post('/user/authentication/verification', 'api/UserController.authenticationVerification')

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
  Route.get('/customer/filter/:type', 'api/CustomerController.filter')
  Route.get('/customer/userinfo/:id', 'api/CustomerController.customerInfo')
  Route.post('/customer/field/update/:id', 'api/CustomerController.updateCustomerField')
  Route.post('/customer/data/phone/:phone', 'api/CustomerController.phoneUpdateCustomerData')
  Route.get('/customer/userlist', 'api/CustomerController.customerList')
  Route.get('/customer/userlist/show/:id', 'api/CustomerController.customerShow')
  Route.post('/customer/create', 'api/CustomerController.createCustomerinfo')
  Route.post('/customer/create/relation', 'api/CustomerController.relationCustomerinfo')
  Route.post('/customer/:status/:id', 'api/CustomerController.statusCustomer')
  Route.get('/customer/verify/phone', 'api/CustomerController.verifyPhone')

  Route.get('/college', 'api/CollegeController.index')
  Route.get('/aliyun/SendSms', 'api/AliyunController.SendSms')

  Route.post('/file/upload', 'api/FilesController.upload')

  Route.get('/comments/my', 'api/CommentsController.my')
  Route.post('/comments/create', 'api/CommentsController.create')

  Route.get('/event/descovery', 'api/EventController.descovery')
  Route.get('/event/descovery/:type/:id', 'api/EventController.type')
  Route.get('/event/like/:type/:id', 'api/EventController.like')
  Route.post('/event/like/:type/:id', 'api/EventController.like')
  Route.post('/event/datas/:type', 'api/EventController.datas')

  Route.get('/query/school', 'api/QueryController.school')
  Route.get('/query/company', 'api/QueryController.company')
}).middleware('apiCheck').prefix('/api')

Route.group(() => {
  Route.get('/customer/invite-friends-fill', 'web/CustomersController.inviteFriendsFill')
  Route.get('/operates/verification/review/:id', 'admin/OperatesController.review')
  Route.post('/operates/verification/review/:id', 'admin/OperatesController.review')
}).prefix('/web')

Route.group(() => {
  Route.get('/datas', 'admin/DataController.index')

  Route.get('/operates', 'admin/OperatesController.index')
  Route.post('/operates', 'admin/OperatesController.save')
  Route.get('/incentive', 'admin/OperatesController.incentive')
  Route.get('/operates/verification', 'admin/OperatesController.verification')
  Route.get('/operates/verification/review/:id', 'admin/OperatesController.review')
  Route.post('/operates/verification/review/:id', 'admin/OperatesController.review')

  Route.get('/users', 'admin/UsersController.index')
  Route.get('/users/edit/:user_id', 'admin/UsersController.edit')
  Route.post('/users/update/:user_id', 'admin/UsersController.update')

  Route.get('/customers', 'admin/CustomersController.index')
  Route.get('/customers/edit/:id', 'admin/CustomersController.edit')
  Route.post('/customers/edit/:id', 'admin/CustomersController.edit')
  Route.post('/customers/field', 'admin/CustomersController.field')

  Route.get('/event/descovery', 'admin/EventController.descovery')
  Route.post('/event/descovery/:type', 'admin/EventController.dataType')

  Route.get('/files', 'admin/FilesController.index')

  Route.get('/chatroom', 'admin/ChatroomController.index')
  Route.get('/chatroom/edit/:id', 'admin/ChatroomController.edit').as('admin.chatroom.edit')
  Route.post('/chatroom/store', 'admin/ChatroomController.store')
  Route.post('/chatroom/update', 'admin/ChatroomController.update')

  Route.get('/questions', 'admin/QuestionsController.index')
  Route.get('/questions/answer/:type', 'admin/QuestionsController.answer')
  Route.get('/questions/edit/:id', 'admin/QuestionsController.edit')
  Route.get('/questions/create', 'admin/QuestionsController.create')
  Route.post('/questions/save', 'admin/QuestionsController.save')
  Route.post('/questions/update', 'admin/QuestionsController.update')

  Route.get('/login', 'admin/UsersController.login')
  Route.post('/login', 'admin/UsersController.login')
}).middleware('adminCheck').prefix('/admin')
