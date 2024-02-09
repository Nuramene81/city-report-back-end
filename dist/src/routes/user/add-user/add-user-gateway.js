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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserGateway = void 0;
const db_pool_1 = require("../../../../db-pool");
const constants_1 = require("../../../../constants");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AddUserGateway {
    constructor() {
        this.pool = new db_pool_1.Pool();
        this.pool.connect(constants_1.DB_CONFIG_OPTIONS);
    }
    IsExistingEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`SELECT "Email" FROM "Users" WHERE "Email" = $1;`, [email]);
            return result.rowCount > 0;
        });
    }
    IsExistingUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`SELECT "Username" FROM "Users" WHERE "Username" = $1;`, [username]);
            return result.rowCount > 0;
        });
    }
    Add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.pool.query(`INSERT INTO "Users" (
        "FullName", "Username", "Email", "Password"
      )
        VALUES ($1, $2, $3, $4) RETURNING "ID";`, [
                user.fullName,
                user.username,
                user.email,
                yield this.hashPassword(user.password)
            ]);
            return new user_1.User(data.rows[0].ID);
        });
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return yield bcrypt_1.default.hash(password, saltRounds);
        });
    }
}
exports.AddUserGateway = AddUserGateway;
