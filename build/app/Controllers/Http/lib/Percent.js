"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
function percentUserinfo(user_id) {
    return new Promise(async (resolve, reject) => {
        let percent = 0, value = '', text = '';
        const user = await Database_1.default.from('users').select('*').where({ user_id }).first();
        if (user.nickname)
            percent += 5;
        if (user.avatar_url) {
            const url = user.avatar_url.split('/');
            if (url[2] != 'normal-avatars')
                percent += 10;
        }
        if (user.birthday)
            percent += 5;
        if (user.height)
            percent += 5;
        if (user.sex)
            percent += 5;
        if (user.work)
            percent += 5;
        if (user.photos && user.photos.length) {
            if (user.photos.length > 4)
                percent += 20;
            else if (user.photos.length > 2)
                percent += 10;
            else
                percent += 5;
        }
        if (user.video && user.video.length)
            percent += 5;
        if (user.detail)
            percent += 5;
        if (user.contact_wechat)
            percent += 5;
        if (user.school)
            percent += 5;
        if (user.company)
            percent += 5;
        if (user.location)
            percent += 5;
        if (user.salary)
            percent += 5;
        if (user.phone)
            percent += 5;
        if (percent >= 80) {
            text = '';
            value = percent + '%';
        }
        else {
            text = '完善资料进度低';
            value = percent + '%';
        }
        resolve({ text, value });
    });
}
function percentCustomerinfo(id) {
    return new Promise(async (resolve, reject) => {
        let percent = 0, value = '', text = '';
        const customer = await Database_1.default.from('customer_log').select('*').where({ id }).first();
        if (customer.nickname)
            percent += 5;
        if (customer.avatar_url) {
            const url = customer.avatar_url.split('/');
            if (url[2] != 'normal-avatars')
                percent += 10;
        }
        if (customer.birthday)
            percent += 5;
        if (customer.height)
            percent += 5;
        if (customer.sex)
            percent += 5;
        if (customer.work)
            percent += 5;
        if (customer.photos && customer.photos.length) {
            if (customer.photos.length > 4)
                percent += 20;
            else if (customer.photos.length > 2)
                percent += 10;
            else
                percent += 5;
        }
        if (customer.video && customer.video.length)
            percent += 5;
        if (customer.detail)
            percent += 5;
        if (customer.contact_wechat)
            percent += 5;
        if (customer.school)
            percent += 5;
        if (customer.company)
            percent += 5;
        if (customer.location)
            percent += 5;
        if (customer.salary)
            percent += 5;
        if (customer.phone)
            percent += 5;
        if (percent >= 80) {
            text = '';
            value = percent + '%';
        }
        else {
            text = '完善资料进度低';
            value = percent + '%';
        }
        resolve({ text, value });
    });
}
module.exports = {
    percentUserinfo,
    percentCustomerinfo
};
//# sourceMappingURL=Percent.js.map