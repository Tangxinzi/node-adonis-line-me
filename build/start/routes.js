"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async ({ view }) => {
    return view.render('welcome');
});
Route_1.default.post('/api/friend/verify', 'api/FriendController.verify');
Route_1.default.post('/api/friend/verify-face', 'api/FriendController.verifyFace');
Route_1.default.post('/api/friend/customer/field/update/:id', 'api/FriendController.updateCustomerField');
Route_1.default.group(() => {
    Route_1.default.get('/filter', 'api/FiltersController.index');
    Route_1.default.post('/filter', 'api/FiltersController.index');
    Route_1.default.get('/filter/match', 'api/FiltersController.match');
    Route_1.default.get('/filter/customer', 'api/FiltersController.customer');
    Route_1.default.get('/user/wxa-login', 'api/UserController.wxaLogin');
    Route_1.default.get('/user/login/phone', 'api/UserController.phoneLogin');
    Route_1.default.get('/user/info', 'api/UserController.getUserinfo');
    Route_1.default.post('/user/info', 'api/UserController.updateUserinfo');
    Route_1.default.post('/user/find/:type', 'api/UserController.findUser');
    Route_1.default.post('/user/change-type', 'api/UserController.changeType');
    Route_1.default.post('/user/field', 'api/UserController.updateUserField');
    Route_1.default.post('/user/recommend/home', 'api/UserController.recommendHome');
    Route_1.default.post('/user/custom/create', 'api/PublishesController.create');
    Route_1.default.get('/user/qrcode', 'api/UserController.qrcode');
    Route_1.default.get('/user/location', 'api/UserController.location');
    Route_1.default.get('/user/chat', 'api/ChatsroomController.chat');
    Route_1.default.get('/user/chat/send', 'api/ChatsroomController.send');
    Route_1.default.get('/user/chat/messages', 'api/ChatsroomController.messages');
    Route_1.default.get('/user/question', 'api/QuestionsController.index');
    Route_1.default.get('/user/question/lists', 'api/QuestionsController.questionLists');
    Route_1.default.get('/user/answer/lists', 'api/QuestionsController.answerLists');
    Route_1.default.get('/user/answer/introduce/lists', 'api/QuestionsController.introduceLists');
    Route_1.default.get('/user/question/show/:id', 'api/QuestionsController.show');
    Route_1.default.get('/user/question/answer/:id', 'api/QuestionsController.answer');
    Route_1.default.post('/user/question/answer/:id', 'api/QuestionsController.answer');
    Route_1.default.get('/user/moments', 'api/MomentsController.index');
    Route_1.default.get('/user/moment/show/:id', 'api/MomentsController.show');
    Route_1.default.get('/user/moment/lists', 'api/MomentsController.lists');
    Route_1.default.post('/user/moment/create', 'api/MomentsController.create');
    Route_1.default.get('/customs', 'api/CustomerController.index');
    Route_1.default.get('/customer/filter/:type', 'api/CustomerController.filter');
    Route_1.default.get('/customer/userinfo/:id', 'api/CustomerController.customerInfo');
    Route_1.default.post('/customer/field/update/:id', 'api/CustomerController.updateCustomerField');
    Route_1.default.post('/customer/data/phone/:phone', 'api/CustomerController.phoneUpdateCustomerData');
    Route_1.default.get('/customer/userlist', 'api/CustomerController.customerList');
    Route_1.default.get('/customer/userlist/show/:id', 'api/CustomerController.customerShow');
    Route_1.default.post('/customer/create', 'api/CustomerController.createCustomerinfo');
    Route_1.default.post('/customer/update', 'api/CustomerController.updateCustomerinfo');
    Route_1.default.post('/customer/create/relation', 'api/CustomerController.relationCustomerinfo');
    Route_1.default.post('/customer/:status/:id', 'api/CustomerController.statusCustomer');
    Route_1.default.get('/customer/verify/phone', 'api/CustomerController.verifyPhone');
    Route_1.default.get('/customer/introduce/labels', 'api/CustomerController.introduceLabels');
    Route_1.default.post('/customer/introduce', 'api/CustomerController.introduceGenerate');
    Route_1.default.get('/college', 'api/CollegeController.index');
    Route_1.default.get('/aliyun/SendSms', 'api/AliyunController.SendSms');
    Route_1.default.post('/file/upload', 'api/FilesController.upload');
    Route_1.default.get('/comments/my', 'api/CommentsController.my');
    Route_1.default.post('/comments/create', 'api/CommentsController.create');
    Route_1.default.get('/article/show/:id', 'admin/ArticleController.show');
    Route_1.default.get('/business/lists', 'api/BusinessesController.lists');
    Route_1.default.get('/business/show/:id', 'api/BusinessesController.show');
    Route_1.default.get('/business/show/:id/moments', 'api/BusinessesController.moments');
    Route_1.default.get('/verification/pending/:table/:field', 'api/OperatesController.pendingType');
    Route_1.default.get('/authentication/verification', 'api/OperatesController.authenticationVerification');
    Route_1.default.post('/authentication/verification', 'api/OperatesController.authenticationVerification');
    Route_1.default.get('/user/incentive', 'api/OperatesController.incentive');
    Route_1.default.get('/descovery', 'api/DescoveriesController.index');
    Route_1.default.get('/descovery/type/:type/:id', 'api/DescoveriesController.type');
    Route_1.default.get('/descovery/personal/:type', 'api/DescoveriesController.personal');
    Route_1.default.get('/event/like/:type/:id', 'api/EventController.like');
    Route_1.default.post('/event/like/:type/:id', 'api/EventController.like');
    Route_1.default.post('/event/datas/:type', 'api/EventController.datas');
    Route_1.default.get('/query/school', 'api/QueryController.school');
    Route_1.default.get('/query/company', 'api/QueryController.company');
    Route_1.default.get('/query/job_title', 'api/QueryController.job_title');
    Route_1.default.post('/datas/tracking/information-improvement-process', 'api/TrackingController.informationImprovementProcess');
    Route_1.default.get('/gift/reward/videos', 'api/GiftController.rewardVideos');
    Route_1.default.post('/gift/reward/videos', 'api/GiftController.rewardVideos');
}).middleware('apiCheck').prefix('/api');
Route_1.default.group(() => {
    Route_1.default.get('/verification', 'api/AdminController.verification');
    Route_1.default.get('/verification/review/:id', 'api/AdminController.review');
    Route_1.default.post('/verification/review/:id', 'api/AdminController.review');
    Route_1.default.get('/customer', 'api/AdminController.customer');
    Route_1.default.post('/customer/status/:customer_id/:status', 'api/AdminController.customerStatus');
    Route_1.default.post('/customer/recommend/:customer_id/:recommend', 'api/AdminController.customerRecommend');
    Route_1.default.get('/users', 'api/AdminController.users');
}).middleware('apiAdminCheck').prefix('/api/admin');
Route_1.default.group(() => {
    Route_1.default.get('/datas/board', 'admin/DataController.board');
    Route_1.default.get('/datas/portrait-user', 'admin/DataController.portraitUser');
    Route_1.default.get('/datas/portrait-customer', 'admin/DataController.portraitCustomer');
    Route_1.default.get('/datas/event-tracking', 'admin/DataController.eventTracking');
    Route_1.default.get('/datas/event-tracking/:id', 'admin/TrackingController.eventTrackingID');
    Route_1.default.get('/datas/files', 'admin/DataController.files');
    Route_1.default.get('/datas/friend-basic-data', 'admin/DataController.friendBasicData');
    Route_1.default.get('/operates', 'admin/OperatesController.index');
    Route_1.default.post('/operates', 'admin/OperatesController.save');
    Route_1.default.get('/incentive', 'admin/OperatesController.incentive');
    Route_1.default.post('/incentive', 'admin/OperatesController.incentive');
    Route_1.default.get('/operates/reward-video', 'admin/OperatesController.rewardVideo');
    Route_1.default.post('/operates/reward-video', 'admin/OperatesController.rewardVideo');
    Route_1.default.get('/operates/verification', 'admin/OperatesController.verification');
    Route_1.default.get('/operates/verification/review/:id', 'admin/OperatesController.review');
    Route_1.default.post('/operates/verification/review/:id', 'admin/OperatesController.review');
    Route_1.default.get('/operates/introduction', 'admin/OperatesController.introduction');
    Route_1.default.post('/operates/introduction', 'admin/OperatesController.introduction');
    Route_1.default.get('/security/center', 'admin/SecuritiesController.secCenter');
    Route_1.default.get('/users', 'admin/UsersController.index');
    Route_1.default.get('/users/edit/:user_id', 'admin/UsersController.edit');
    Route_1.default.post('/users/update/:user_id', 'admin/UsersController.update');
    Route_1.default.get('/customers', 'admin/CustomersController.index');
    Route_1.default.get('/customers/edit/:id', 'admin/CustomersController.edit');
    Route_1.default.post('/customers/edit/:id', 'admin/CustomersController.edit');
    Route_1.default.post('/customers/field', 'admin/CustomersController.field');
    Route_1.default.get('/event/descovery', 'admin/EventController.descovery');
    Route_1.default.post('/event/descovery/:type', 'admin/EventController.dataType');
    Route_1.default.get('/files', 'admin/FilesController.index');
    Route_1.default.get('/article', 'admin/ArticleController.index');
    Route_1.default.get('/article/catalog/:catalog', 'admin/ArticleController.catalog');
    Route_1.default.get('/article/create', 'admin/ArticleController.create');
    Route_1.default.get('/article/show/:id', 'admin/ArticleController.show');
    Route_1.default.get('/article/edit/:id', 'admin/ArticleController.edit');
    Route_1.default.post('/article/save', 'admin/ArticleController.save');
    Route_1.default.post('/article/delete', 'admin/ArticleController.delete');
    Route_1.default.get('/chatsroom', 'admin/ChatsroomController.index');
    Route_1.default.get('/chatsroom/edit/:id', 'admin/ChatsroomController.edit').as('admin.chatsroom.edit');
    Route_1.default.post('/chatsroom/store', 'admin/ChatsroomController.store');
    Route_1.default.post('/chatsroom/update', 'admin/ChatsroomController.update');
    Route_1.default.get('/questions', 'admin/QuestionsController.index');
    Route_1.default.get('/questions/answer/:type', 'admin/QuestionsController.answer');
    Route_1.default.get('/questions/edit/:id', 'admin/QuestionsController.edit');
    Route_1.default.get('/questions/create', 'admin/QuestionsController.create');
    Route_1.default.post('/questions/save', 'admin/QuestionsController.save');
    Route_1.default.post('/questions/update', 'admin/QuestionsController.update');
    Route_1.default.get('/business', 'admin/BusinessesController.index');
    Route_1.default.post('/business/save', 'admin/BusinessesController.save');
    Route_1.default.post('/business/update', 'admin/BusinessesController.update');
    Route_1.default.get('/business/show/:id', 'admin/BusinessesController.show');
    Route_1.default.get('/login', 'admin/UsersController.login');
    Route_1.default.post('/login', 'admin/UsersController.login');
}).middleware('adminCheck').prefix('/admin');
Route_1.default.group(() => {
    Route_1.default.get('/user/share', 'web/UserController.share');
    Route_1.default.get('/incentive/login', 'web/UserController.incentiveLogin');
    Route_1.default.post('/incentive/login', 'web/UserController.incentiveLogin');
}).middleware('webCheck').prefix('/web');
//# sourceMappingURL=routes.js.map