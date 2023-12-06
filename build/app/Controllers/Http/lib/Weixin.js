"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
function jscode2session(code) {
    return new Promise((resolve, reject) => {
        return axios_1.default.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${Env_1.default.get('AppID')}&secret=${Env_1.default.get('AppSecret')}&js_code=${code}&grant_type=authorization_code`)
            .then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
            reject(error);
        });
    });
}
function token() {
    return new Promise((resolve, reject) => {
        return axios_1.default.get(`https://api.weixin.qq.com/cgi-bin/token?appid=${Env_1.default.get('AppID')}&secret=${Env_1.default.get('AppSecret')}&grant_type=client_credential`)
            .then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
            reject(error);
        });
    });
}
function getUserPhoneNumber(access_token, data) {
    return new Promise((resolve, reject) => {
        return axios_1.default.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`, {
            code: data.code,
            openid: data.openid
        })
            .then((response) => {
            resolve(response.data);
        })
            .catch((error) => {
            reject(error);
        });
    });
}
function generateUrllink(data) {
    try {
        return new Promise(async (resolve, reject) => {
            const token = await this.token();
            return await (0, axios_1.default)({
                url: `https://api.weixin.qq.com/wxa/generate_urllink?access_token=${token.access_token}`,
                method: 'post',
                data: JSON.stringify({
                    "path": data.path,
                    "env_version": "trial"
                }),
            }).then(response => {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(false);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
function genwxaShortlink(data) {
    try {
        return new Promise(async (resolve, reject) => {
            const token = await this.token();
            return await (0, axios_1.default)({
                url: `https://api.weixin.qq.com/wxa/genwxashortlink?access_token=${token.access_token}`,
                method: 'post',
                data: JSON.stringify({
                    "page_url": data.path,
                    "page_title": "test"
                }),
            }).then(response => {
                resolve(response.data);
            }).catch(function (error) {
                console.log(error);
                reject(false);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
function getWxacode(data) {
    try {
        return new Promise(async (resolve, reject) => {
            const token = await this.token();
            return await (0, axios_1.default)({
                url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${token.access_token}`,
                method: 'post',
                data: JSON.stringify({
                    "width": "300",
                    "path": data.path,
                    "is_hyaline": false,
                    "env_version": "trial"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                responseType: 'arraybuffer'
            }).then(response => {
                const path = `/uploads/wxacode/${data.filename}.png`;
                fs_1.default.writeFileSync(Application_1.default.publicPath(path), response.data, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    fs_1.default.readFile(path, (data, err) => {
                        if (err) {
                            resolve(false);
                        }
                        resolve(path);
                    });
                });
            }).catch(function (error) {
                console.log(error);
                reject(false);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = {
    jscode2session,
    token,
    generateUrllink,
    genwxaShortlink,
    getWxacode,
    getUserPhoneNumber
};
//# sourceMappingURL=Weixin.js.map