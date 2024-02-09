"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserLoggedIn = void 0;
function isUserLoggedIn(req, res, next) {
    if (!req.session.userUUID) {
        res.json({ message: 'You are not logged in' });
        return;
    }
    else {
        next();
    }
}
exports.isUserLoggedIn = isUserLoggedIn;
