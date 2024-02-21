"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const moment_1 = __importDefault(require("moment"));
moment_1.default.locale('zh-cn');
const axios = require('axios');
class QueryController {
    async school({ request, response, session }) {
        try {
            const all = request.all();
            return new Promise((resolve, reject) => {
                return axios.get(`https://www.zhipin.com/wapi/zpgeek/autocomplete/school.json?query=${all.query}`)
                    .then((response) => {
                    resolve(response.data);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async company({ request, response, session }) {
        try {
            const all = request.all();
            return new Promise((resolve, reject) => {
                return axios.get(`https://www.zhipin.com/wapi/zpgeek/autocomplete/company.json?query=${all.query}`)
                    .then((response) => {
                    resolve(response.data);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
    async job_title({ request, response, session }) {
        try {
            const all = request.all();
            return new Promise((resolve, reject) => {
                return axios.get(`https://www.zhipin.com/wapi/zpgeek/suggest/position/query.json?type=0&query=${all.query}`)
                    .then((response) => {
                    resolve(response.data);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        }
        catch (error) {
            Logger_1.default.error("error 获取失败 %s", JSON.stringify(error));
            response.json({
                status: 500,
                message: "internalServerError",
                data: error
            });
        }
    }
}
exports.default = QueryController;
//# sourceMappingURL=QueryController.js.map