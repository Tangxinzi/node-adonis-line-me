"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const College_1 = __importDefault(require("../lib/College"));
class CollegeController {
    async index({ response, request, session }) {
        try {
            return await College_1.default.data();
        }
        catch (e) {
            console.log(e);
            return { errno: 0, message: e };
        }
    }
}
exports.default = CollegeController;
//# sourceMappingURL=CollegeController.js.map