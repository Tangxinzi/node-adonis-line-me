"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
class TrackingController {
    async eventTrackingID({ request, response, view, session }) {
        try {
            const all = request.all();
            const tracking = await Database_1.default.from('tracking').where({ type: 'information-improvement-process' }).orderBy('created_at', 'desc').forPage(request.input('page', 1), 30);
            for (let index = 0; index < tracking.length; index++) {
                tracking[index].content = JSON.parse(tracking[index].content);
                tracking[index].content.type = tracking[index].content.type == 'users' ? '创建用户' : '介绍好友';
                tracking[index].created_at = (0, moment_1.default)(tracking[index].created_at).format('YYYY-MM-DD HH:mm:ss');
                tracking[index].content.itemStayValue = {
                    userType: {},
                    userAvatarNick: {},
                    userSex: {},
                    userHeight: {},
                    userBirthday: {},
                    userWork: {},
                    userPhotos: {},
                    userSchool: {},
                    userCompany: {},
                    userJobTitle: {}
                };
                for (let typeIndex = 0; typeIndex < tracking[index].content.itemStayType.length; typeIndex++) {
                    switch (tracking[index].content.itemStayType[typeIndex]) {
                        case 'userType':
                            tracking[index].content.itemStayValue.userType = {
                                text: '角色',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userAvatarNick':
                            tracking[index].content.itemStayValue.userAvatarNick = {
                                text: '头像',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userSex':
                            tracking[index].content.itemStayValue.userSex = {
                                text: '性别',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userHeight':
                            tracking[index].content.itemStayValue.userHeight = {
                                text: '身高',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userBirthday':
                            tracking[index].content.itemStayValue.userBirthday = {
                                text: '生日',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userSchool':
                            tracking[index].content.itemStayValue.userSchool = {
                                text: '学校',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userCompany':
                            tracking[index].content.itemStayValue.userCompany = {
                                text: '公司',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userJobTitle':
                            tracking[index].content.itemStayValue.userJobTitle = {
                                text: '职位',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userWork':
                            tracking[index].content.itemStayValue.userWork = {
                                text: '职业',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        case 'userPhotos':
                            tracking[index].content.itemStayValue.userPhotos = {
                                text: '照片',
                                time: tracking[index].content.itemStayTime[typeIndex]
                            };
                            break;
                        default:
                    }
                }
                delete tracking[index].content.itemStayType, delete tracking[index].content.itemStayTime;
            }
            return view.render('admin/event-tracking/information-improvement-process', {
                data: {
                    title: '[IIP] 信息完善流程',
                    active: 'datas',
                    tracking,
                    all
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = TrackingController;
//# sourceMappingURL=TrackingController.js.map