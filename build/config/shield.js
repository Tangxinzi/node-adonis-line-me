"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTypeSniffing = exports.hsts = exports.xFrame = exports.dnsPrefetch = exports.csrf = exports.csp = void 0;
exports.csp = {
    enabled: false,
    directives: {},
    reportOnly: false,
};
exports.csrf = {
    enabled: true,
    exceptRoutes: [
        '/land/file/upload',
        '/land/user/info/upload',
        '/land/user/like/:id',
        '/api/file/upload',
        '/api/customer/create',
        '/api/customer/create/relation',
        '/api/customer/:status/:id',
        '/api/customer/field/update/:id',
        '/api/customer/data/phone/:phone',
        '/api/user/custom/create',
        '/api/user/recommend/home',
        '/api/user/authentication/verification',
        '/api/user/change-type',
        '/api/user/field',
        '/api/user/info',
        '/api/user/question/answer/:id',
        '/api/user/moment/create',
        '/api/event/datas/:type',
        '/api/event/like/:type/:id',
        '/api/comments/create',
    ],
    enableXsrfCookie: true,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
};
exports.dnsPrefetch = {
    enabled: true,
    allow: true,
};
exports.xFrame = {
    enabled: true,
    action: 'DENY',
};
exports.hsts = {
    enabled: true,
    maxAge: '180 days',
    includeSubDomains: true,
    preload: false,
};
exports.contentTypeSniffing = {
    enabled: true,
};
//# sourceMappingURL=shield.js.map