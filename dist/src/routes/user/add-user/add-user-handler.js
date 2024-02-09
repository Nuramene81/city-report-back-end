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
exports.addUserHandler = void 0;
const add_user_transaction_1 = require("./add-user-transaction");
const add_user_gateway_1 = require("./add-user-gateway");
function addUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new add_user_transaction_1.AddUserTransaction(new add_user_gateway_1.AddUserGateway());
        try {
            const response = yield transaction.Add(makeRequestIntoUserRequest(req));
            req.session.userUUID = response.userUUID;
            res.status(201).json({ message: 'User created' });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
                return;
            }
            else {
                res.status(500).json({ message: 'An unexpected error occurred' });
                return;
            }
        }
    });
}
exports.addUserHandler = addUserHandler;
function makeRequestIntoUserRequest(req) {
    return {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
}
