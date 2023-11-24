"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const randomstring_1 = __importDefault(require("randomstring"));
class FilesController {
    async upload({ request, session }) {
        try {
            if (request.file('files')) {
                let file = {};
                const profile = request.file('files', { type: ['image', 'video'], size: '100mb' });
                const profileName = `${randomstring_1.default.generate(32)}.${profile.extname}`;
                const profilePath = `/uploads/files/`;
                file.fileName = profile.clientName;
                file.fileSrc = profilePath + profileName;
                await profile.move(Application_1.default.publicPath(profilePath), {
                    name: profileName,
                    overwrite: true
                });
                if (profile.state == 'moved') {
                    await Database_1.default.table('files').insert({
                        filePath: file.fileSrc,
                        clientName: profile.clientName,
                        fileName: profile.fileName,
                        fieldName: profile.fieldName,
                        size: profile.size,
                        type: profile.type,
                        subtype: profile.subtype,
                        status: profile.status,
                        extname: profile.extname,
                        related_user_id: session.get('user_id')
                    });
                }
                return {
                    errno: 0,
                    data: {
                        url: file.fileSrc
                    }
                };
            }
            return { errno: 1, message: '' };
        }
        catch (e) {
            console.log(e);
            return { errno: 0, message: e };
        }
    }
}
exports.default = FilesController;
//# sourceMappingURL=FilesController.js.map