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
exports.getCurrentUserHandler = void 0;
const db_pool_1 = require("../../../../db-pool");
const constants_1 = require("../../../../constants");
const user_1 = require("../../user/models/user");
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userUUID = req.session.userUUID;
        const pool = new db_pool_1.Pool();
        pool.connect(constants_1.DB_CONFIG_OPTIONS);
        const data = yield pool.query('SELECT * FROM "Users" WHERE "ID" = $1', [userUUID]);
        if (data.rows.length === 0) {
            res.status(400).json({ message: 'User does not exist' });
            return;
        }
        res.status(200).json(makeUserResponse(data));
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
function makeUserResponse(data) {
    return new user_1.User(data.rows[0].ID, data.rows[0].FullName, data.rows[0].Username, undefined, undefined, data.rows[0].ProfileImageURL);
}
