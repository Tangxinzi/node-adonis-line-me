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
            const tracking = await Database_1.default.from('tracking').where({ type: 'information-improvement-process' });
            for (let index = 0; index < tracking.length; index++) {
                tracking[index].content = JSON.parse(tracking[index].content);
                tracking[index].content.type = tracking[index].content.type == 'users' ? '创建用户' : '介绍好友';
                tracking[index].content.itemStayValue = [];
                for (let typeIndex = 0; typeIndex < tracking[index].content.itemStayType.length; typeIndex++) {
                    let text = '';
                    switch (tracking[index].content.itemStayType[typeIndex]) {
                        case 'userType':
                            text = '角色';
                            break;
                        case 'userAvatarNick':
                            text = '头像';
                            break;
                        case 'userSex':
                            text = '性别';
                            break;
                        case 'userHeight':
                            text = '身高';
                            break;
                        case 'userBirthday':
                            text = '生日';
                            break;
                        case 'userWork':
                            text = '职业';
                            break;
                        case 'userPhotos':
                            text = '照片';
                            break;
                        default:
                            text = '其它';
                    }
                    tracking[index].content.itemStayValue[typeIndex] = {
                        text,
                        type: tracking[index].content.itemStayType[typeIndex],
                        time: tracking[index].content.itemStayTime[typeIndex],
                    };
                }
                delete tracking[index].content.itemStayType, delete tracking[index].content.itemStayTime;
            }
            return view.render('admin/event-tracking/information-improvement-process', {
                data: {
                    title: '[IIP] 信息完善流程',
                    active: 'datas',
                    tracking
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