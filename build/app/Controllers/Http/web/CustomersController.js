"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomersController {
    async inviteFriendsFill({ request, response, view, session }) {
        try {
            const all = request.all();
            return view.render('web/customer/invite-friends-fill', {
                data: {
                    title: '',
                    customer: {
                        userinfo: {}
                    }
                }
            });
        }
        catch (error) {
        }
    }
}
exports.default = CustomersController;
//# sourceMappingURL=CustomersController.js.map