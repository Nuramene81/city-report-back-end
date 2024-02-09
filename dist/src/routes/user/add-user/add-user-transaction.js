"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserTransaction = void 0;
const USERNAME_ERROR = 'Username already exists';
const EMAIL_ERROR = 'Email already exists';
class AddUserTransaction {
    constructor(gateway) {
        this.gateway = gateway;
    }
    Add(userRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.addUserRequest = userRequest;
            yield this.validateRequest();
            return yield this.gateway.Add(this.addUserRequest);
        });
    }
    validateRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateEmail();
            yield this.validateUsername();
        });
    }
    validateEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.gateway.IsExistingEmail(this.addUserRequest.email)) {
                throw new Error(EMAIL_ERROR);
            }
        });
    }
    validateUsername() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.gateway.IsExistingUsername(this.addUserRequest.username)) {
                throw new Error(USERNAME_ERROR);
            }
        });
    }
}
exports.AddUserTransaction = AddUserTransaction;
