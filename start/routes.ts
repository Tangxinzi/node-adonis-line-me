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

// 邀请验证模块
Route.post('/api/friend/verify', 'api/FriendController.verify')
Route.post('/api/friend/verify-face', 'api/FriendController.verifyFace')
Route.post('/api/friend/customer/field/update/:id', 'api/FriendController.updateCustomerField')

Route.group(() => {
  Route.get('/filter', 'api/FiltersController.index')
  Route.post('/filter', 'api/FiltersController.index')
  Route.get('/filter/match', 'api/FiltersController.match')
  Route.get('/filter/customer', 'api/FiltersController.customer')

  Route.get('/user/wxa-login', 'api/UserController.wxaLogin')
  Route.get('/user/login/phone', 'api/UserController.phoneLogin')
  Route.get('/user/info', 'api/UserController.getUserinfo')
  Route.post('/user/info', 'api/UserController.updateUserinfo')
  Route.post('/user/find/:type', 'api/UserController.findUser')
  Route.post('/user/change-type', 'api/UserController.changeType')
  Route.post('/user/field', 'api/UserController.updateUserField')
  Route.post('/user/recommend/home', 'api/UserController.recommendHome')
  Route.post('/user/custom/create', 'api/PublishesController.create')
  Route.get('/user/qrcode', 'api/UserController.qrcode')
  Route.get('/user/location', 'api/UserController.location')

  Route.get('/user/chat', 'api/ChatsroomController.chat')
  Route.get('/user/chat/send', 'api/ChatsroomController.send')
  Route.get('/user/chat/messages', 'api/ChatsroomController.messages')

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
  Route.get('/customer/like/:id', 'api/CustomerController.customerLike')
  Route.post('/customer/create', 'api/CustomerController.createCustomerinfo')
  Route.post('/customer/update', 'api/CustomerController.updateCustomerinfo')
  Route.post('/customer/create/relation', 'api/CustomerController.relationCustomerinfo')
  Route.post('/customer/:status/:id', 'api/CustomerController.statusCustomer')
  Route.get('/customer/verify/phone', 'api/CustomerController.verifyPhone')
  Route.get('/customer/introduce/labels', 'api/CustomerController.introduceLabels')
  Route.post('/customer/introduce', 'api/CustomerController.introduceGenerate')

  Route.get('/college', 'api/CollegeController.index')
  Route.get('/aliyun/SendSms', 'api/AliyunController.SendSms')

  Route.post('/file/upload', 'api/FilesController.upload')

  Route.get('/comments/my', 'api/CommentsController.my')
  Route.post('/comments/create', 'api/CommentsController.create')

  Route.get('/article/show/:id', 'admin/ArticleController.show')
  Route.get('/business/lists', 'api/BusinessesController.lists')
  Route.get('/business/show/:id', 'api/BusinessesController.show')
  Route.get('/business/show/:id/moments', 'api/BusinessesController.moments')

  // 认证
  Route.get('/verification/pending/:table/:field', 'api/OperatesController.pendingType') // 审核队列
  Route.get('/authentication/verification', 'api/OperatesController.authenticationVerification')
  Route.post('/authentication/verification', 'api/OperatesController.authenticationVerification')
  
  // 介绍激励
  Route.get('/user/incentive', 'api/OperatesController.incentive')

  Route.get('/descovery', 'api/DescoveriesController.index')
  Route.get('/descovery/type/:type/:id', 'api/DescoveriesController.type')
  Route.get('/descovery/personal/:type', 'api/DescoveriesController.personal')
  Route.get('/event/like/:type/:id', 'api/EventController.like')
  Route.post('/event/like/:type/:id', 'api/EventController.like')
  Route.post('/event/datas/:type', 'api/EventController.datas')

  Route.get('/query/school', 'api/QueryController.school')
  Route.get('/query/company', 'api/QueryController.company')
  Route.get('/query/job_title', 'api/QueryController.job_title')

  // datas event-tracking
  Route.post('/datas/tracking/information-improvement-process', 'api/TrackingController.informationImprovementProcess')

  // 权益兑换
  Route.get('/gift/reward/videos', 'api/GiftController.rewardVideos')
  Route.post('/gift/reward/videos', 'api/GiftController.rewardVideos')
  
}).middleware('apiCheck').prefix('/api')

Route.group(() => {
  // 审核
  Route.get('/verification', 'api/AdminController.verification')
  Route.get('/verification/review/:id', 'api/AdminController.review')
  Route.post('/verification/review/:id', 'api/AdminController.review')

  // 全部被介绍人
  Route.get('/customer', 'api/AdminController.customer')
  Route.post('/customer/status/:customer_id/:status', 'api/AdminController.customerStatus')
  Route.post('/customer/recommend/:customer_id/:recommend', 'api/AdminController.customerRecommend')

  // 用户
  Route.get('/users', 'api/AdminController.users')
}).middleware('apiAdminCheck').prefix('/api/admin')

Route.group(() => {
  Route.get('/datas/board', 'admin/DataController.board')
  Route.get('/datas/portrait-user', 'admin/DataController.portraitUser')
  Route.get('/datas/portrait-customer', 'admin/DataController.portraitCustomer')
  Route.get('/datas/event-tracking', 'admin/DataController.eventTracking')
  Route.get('/datas/event-tracking/:id', 'admin/TrackingController.eventTrackingID')
  Route.get('/datas/files', 'admin/DataController.files')
  Route.get('/datas/friend-basic-data', 'admin/DataController.friendBasicData')

  Route.get('/operates', 'admin/OperatesController.index')
  Route.post('/operates', 'admin/OperatesController.save')
  Route.get('/incentive', 'admin/OperatesController.incentive')
  Route.post('/incentive', 'admin/OperatesController.incentive')
  Route.get('/operates/reward-video', 'admin/OperatesController.rewardVideo')
  Route.post('/operates/reward-video', 'admin/OperatesController.rewardVideo')
  Route.get('/operates/verification', 'admin/OperatesController.verification')
  Route.get('/operates/verification/review/:id', 'admin/OperatesController.review')
  Route.post('/operates/verification/review/:id', 'admin/OperatesController.review')
  Route.get('/operates/introduction', 'admin/OperatesController.introduction')
  Route.post('/operates/introduction', 'admin/OperatesController.introduction')

  Route.get('/security/center', 'admin/SecuritiesController.secCenter')

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

  Route.get('/article', 'admin/ArticleController.index')
  Route.get('/article/catalog/:catalog', 'admin/ArticleController.catalog')
  Route.get('/article/create', 'admin/ArticleController.create')
  Route.get('/article/show/:id', 'admin/ArticleController.show')
  Route.get('/article/edit/:id', 'admin/ArticleController.edit')
  Route.post('/article/save', 'admin/ArticleController.save')
  Route.post('/article/delete', 'admin/ArticleController.delete')

  Route.get('/chatsroom', 'admin/ChatsroomController.index')
  Route.get('/chatsroom/edit/:id', 'admin/ChatsroomController.edit').as('admin.chatsroom.edit')
  Route.post('/chatsroom/store', 'admin/ChatsroomController.store')
  Route.post('/chatsroom/update', 'admin/ChatsroomController.update')

  Route.get('/questions', 'admin/QuestionsController.index')
  Route.get('/questions/answer/:type', 'admin/QuestionsController.answer')
  Route.get('/questions/edit/:id', 'admin/QuestionsController.edit')
  Route.get('/questions/create', 'admin/QuestionsController.create')
  Route.post('/questions/save', 'admin/QuestionsController.save')
  Route.post('/questions/update', 'admin/QuestionsController.update')

  Route.get('/business', 'admin/BusinessesController.index')
  Route.post('/business/save', 'admin/BusinessesController.save')
  Route.post('/business/update', 'admin/BusinessesController.update')
  Route.get('/business/show/:id', 'admin/BusinessesController.show')

  Route.get('/login', 'admin/UsersController.login')
  Route.post('/login', 'admin/UsersController.login')
}).middleware('adminCheck').prefix('/admin')

Route.group(() => {
  Route.get('/user/share', 'web/UserController.share')
  Route.get('/incentive/login', 'web/UserController.incentiveLogin')
  Route.post('/incentive/login', 'web/UserController.incentiveLogin')
}).middleware('webCheck').prefix('/web')
