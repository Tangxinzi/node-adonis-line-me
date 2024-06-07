"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const score = {
    company: [10, 10, 10],
    work: [10, 10, 10],
    job_title: [10, 10, 10],
    salary: [5, 5, 5],
    school: [5, 5, 5],
    education: [5, 5, 5],
    nickname: [3, 3, 3],
    avatar_url: [5, 0, 5],
    birthday: [5, 5, 5],
    height: [3, 3, 3],
    weight: [3, 3, 3],
    sex: [3, 3, 3],
    mbti: [3, 3, 3],
    photos: [3, 5, 5],
    introduction: [5, 5, 5],
    detail: [5, 5, 5],
    expectation: [0, 5, 5],
    contact_wechat: [3, 3, 3],
    location: [3, 3, 3],
    phone: [3, 3, 3],
    relation_text: [0, 5, 0]
};
function percentUserinfo(user_id) {
    return new Promise(async (resolve, reject) => {
        let percent = 0, value = '', text = '';
        const user = await Database_1.default.from('users').select('*').where({ user_id }).first() || {};
        if (user.type == 1) {
            if (user.company)
                percent += score.company[2];
            if (user.work.length > 5)
                percent += score.work[2];
            if (user.job_title)
                percent += score.job_title[2];
            if (user.salary != null)
                percent += score.salary[2];
            if (user.school)
                percent += score.school[2];
            if (user.education != null)
                percent += score.education[2];
            if (user.mbti != null)
                percent += score.mbti[2];
            if (user.nickname)
                percent += score.nickname[2];
            if (user.avatar_url)
                percent += score.avatar_url[2];
            if (user.birthday)
                percent += score.birthday[2];
            if (user.height)
                percent += score.height[2];
            if (user.weight != null)
                percent += score.weight[2];
            if (user.sex != null)
                percent += score.sex[2];
            if (user.photos.length > 12) {
                user.photos = JSON.parse(user.photos);
                percent += user.photos.length * score.photos[2];
            }
            if (user.detail)
                percent += score.detail[2];
            if (user.expectation)
                percent += score.expectation[2];
            if (user.contact_wechat)
                percent += score.contact_wechat[2];
            if (user.location)
                percent += score.location[2];
            if (user.phone)
                percent += score.phone[2];
        }
        if (user.type == 2) {
            if (user.company)
                percent += score.company[0];
            if (user.work.length > 5)
                percent += score.work[0];
            if (user.job_title)
                percent += score.job_title[0];
            if (user.salary != null)
                percent += score.salary[0];
            if (user.school)
                percent += score.school[0];
            if (user.education != null)
                percent += score.education[0];
            if (user.mbti != null)
                percent += score.mbti[0];
            if (user.nickname)
                percent += score.nickname[0];
            if (user.avatar_url)
                percent += score.avatar_url[0];
            if (user.birthday)
                percent += score.birthday[0];
            if (user.height)
                percent += score.height[0];
            if (user.weight != null)
                percent += score.weight[0];
            if (user.sex != null)
                percent += score.sex[0];
            if (user.photos.length > 12) {
                user.photos = JSON.parse(user.photos);
                percent += user.photos.length * score.photos[0];
            }
            if (user.detail)
                percent += score.detail[0];
            if (user.expectation)
                percent += score.expectation[0];
            if (user.contact_wechat)
                percent += score.contact_wechat[0];
            if (user.location)
                percent += score.location[0];
            if (user.phone)
                percent += score.phone[0];
        }
        if (percent >= 100) {
            value = '100%';
            percent = 100;
            text = '';
        }
        else if (percent >= 80) {
            value = percent + '%';
            text = '';
        }
        else if (percent >= 65) {
            value = percent + '%';
            text = '';
        }
        else {
            value = percent + '%';
            text = '完善资料进度低';
        }
        resolve({ number: percent, value, text });
    });
}
function percentCustomerinfo(id) {
    return new Promise(async (resolve, reject) => {
        let percent = 0, value = '', text = '';
        const log = await Database_1.default.from('customer_log').select('*').where({ id }).first() || {};
        const customer = await Database_1.default.from('customer').select('*').where({ relation_log_id: id }).first() || {};
        if (log.company)
            percent += score.company[1];
        if (log.work.length > 5)
            percent += score.work[1];
        if (log.job_title)
            percent += score.job_title[1];
        if (log.salary != null)
            percent += score.salary[1];
        if (log.school)
            percent += score.school[1];
        if (log.education != null)
            percent += score.education[1];
        if (log.mbti != null)
            percent += score.mbti[1];
        if (log.nickname)
            percent += score.nickname[1];
        if (log.avatar_url)
            percent += score.avatar_url[1];
        if (log.birthday)
            percent += score.birthday[1];
        if (log.height)
            percent += score.height[1];
        if (log.weight != null)
            percent += score.weight[1];
        if (log.sex != null)
            percent += score.sex[1];
        if (log.photos.length > 12) {
            log.photos = JSON.parse(log.photos);
            percent += log.photos.length * score.photos[1];
        }
        if (log.expectation)
            percent += score.expectation[1];
        if (log.contact_wechat)
            percent += score.contact_wechat[1];
        if (log.location)
            percent += score.location[1];
        if (log.phone)
            percent += score.phone[1];
        if (customer.relation_text)
            percent += score.relation_text[1];
        if (customer.introduction)
            percent += score.introduction[1];
        if (percent >= 100) {
            value = '100%';
            percent = 100;
            text = '';
        }
        else if (percent >= 80) {
            value = percent + '%';
            text = '';
        }
        else if (percent >= 65) {
            value = percent + '%';
            text = '';
        }
        else {
            value = percent + '%';
            text = '完善资料进度低';
        }
        resolve({ number: percent, text, value });
    });
}
module.exports = {
    percentUserinfo,
    percentCustomerinfo
};
//# sourceMappingURL=Percent.js.map