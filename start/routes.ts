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
  Route.get('/customer/userinfo/:id', 'api/CustomerController.customerInfo')
  Route.post('/customer/field/update/:id', 'api/CustomerController.updateCustomerField')
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
  Route.get('/users/update', 'admin/UsersController.update')

  Route.get('/customers', 'admin/CustomersController.index')
  Route.get('/customers/edit/:id', 'admin/CustomersController.edit')
  Route.post('/customers/update', 'admin/CustomersController.update')
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

Route.group(() => {
  Route.get('/search', 'land/admin/SearchController.index')
  Route.post('/file/upload', 'land/admin/FilesController.upload')

  Route.get('/user/wx-login', 'land/admin/UserController.wxLogin')
  Route.get('/user/get-phone-number', 'land/admin/UserController.getPhoneNumber')
  Route.get('/user/info', 'land/admin/UserController.userinfo')
  Route.get('/user/collection', 'land/admin/UserController.collection')
  Route.post('/user/info/upload', 'land/admin/UserController.userinfo')
  Route.get('/user/like/:id', 'land/admin/UserController.like')
  Route.post('/user/like/:id', 'land/admin/UserController.like')

  Route.get('/designer', 'land/admin/DesignerController.index')
  Route.get('/designer/catalog/:catalog', 'land/admin/DesignerController.catalog')
  Route.get('/designer/create', 'land/admin/DesignerController.create')
  Route.get('/designer/show/:id', 'land/admin/DesignerController.show')
  Route.get('/designer/edit/:id', 'land/admin/DesignerController.edit')
  Route.post('/designer/save', 'land/admin/DesignerController.save')
  Route.post('/designer/delete', 'land/admin/DesignerController.delete')

  Route.get('/work', 'land/admin/WorkController.index')
  Route.get('/work/catalog/:catalog', 'land/admin/WorkController.catalog')
  Route.get('/work/create', 'land/admin/WorkController.create')
  Route.get('/work/show/:id', 'land/admin/WorkController.show')
  Route.get('/work/edit/:id', 'land/admin/WorkController.edit')
  Route.post('/work/save', 'land/admin/WorkController.save')
  Route.post('/work/delete', 'land/admin/WorkController.delete')

  Route.get('/article', 'land/admin/ArticleController.index')
  Route.get('/article/catalog/:catalog', 'land/admin/ArticleController.catalog')
  Route.get('/article/create', 'land/admin/ArticleController.create')
  Route.get('/article/show/:id', 'land/admin/ArticleController.show')
  Route.get('/article/edit/:id', 'land/admin/ArticleController.edit')
  Route.post('/article/save', 'land/admin/ArticleController.save')
  Route.post('/article/delete', 'land/admin/ArticleController.delete')

  Route.get('/good', 'land/admin/GoodController.index')
  Route.get('/good/catalog', 'land/admin/GoodController.catalog')
  Route.get('/good/supplier', 'land/admin/GoodController.supplier')
  Route.post('/good/supplier/save', 'land/admin/GoodController.supplierSave')
  Route.post('/good/catalog', 'land/admin/GoodController.catalog')
  Route.get('/good/create', 'land/admin/GoodController.create')
  Route.get('/good/show/:id', 'land/admin/GoodController.show')
  Route.get('/good/edit/:id', 'land/admin/GoodController.edit')
  Route.post('/good/save', 'land/admin/GoodController.save')
  Route.post('/good/delete', 'land/admin/GoodController.delete')
}).prefix('/land')

Route.group(() => {
  Route.get('/supplier/login/:supplier_name_login', 'land/admin/SupplierController.login')
  Route.post('/supplier/login/:supplier_name_login', 'land/admin/SupplierController.login')
  Route.get('/supplier/goods', 'land/admin/SupplierController.index')
  Route.get('/supplier/goods/create', 'land/admin/SupplierController.create')
  Route.get('/supplier/goods/edit/:id', 'land/admin/SupplierController.edit')
  Route.post('/supplier/goods/create', 'land/admin/SupplierController.save')
  Route.post('/supplier/goods/delete', 'land/admin/SupplierController.delete')
}).prefix('/land')
