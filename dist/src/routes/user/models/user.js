"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userUUID, fullName, username, email, password, profileImageURL) {
        this.userUUID = userUUID;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImageURL = profileImageURL;
    }
}
exports.User = User;
