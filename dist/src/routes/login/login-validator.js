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
exports.loginHandler = void 0;
const db_pool_1 = require("../../../db-pool");
const constants_1 = require("../../../constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const pool = new db_pool_1.Pool();
        pool.connect(constants_1.DB_CONFIG_OPTIONS);
        const data = yield pool.query('SELECT * FROM "Users" WHERE "Email" = $1', [email]);
        if (data.rows.length === 0) {
            res.status(400).json({ message: 'Incorrect login details' });
            return;
        }
        const hashedPassword = data.rows[0].Password;
        const isVerified = yield bcrypt_1.default.compare(password, hashedPassword);
        if (isVerified) {
            req.session.userUUID = data.rows[0].ID;
            res.status(200).json({ message: 'Login Successful!' });
            return;
        }
        else {
            res.status(200).json({ message: 'Incorrect login details' });
            return;
        }
    });
}
exports.loginHandler = loginHandler;
