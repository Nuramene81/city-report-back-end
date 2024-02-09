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
exports.Pool = void 0;
const pg_1 = __importDefault(require("pg"));
const constants_1 = require("./constants");
class Pool {
    constructor() {
        this._pool = null;
    }
    connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this._pool = new pg_1.default.Pool(options);
            return this._pool.query('SELECT 1 + 1;');
        });
    }
    close() {
        var _a;
        (_a = this._pool) === null || _a === void 0 ? void 0 : _a.end();
    }
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._pool.query(sql, params);
        });
    }
    testPrimaryDBConection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connect(constants_1.DB_CONFIG_OPTIONS).then(() => {
                console.log('Connected to the database');
            }).catch((err) => {
                console.log('Cannot connect to the database', err);
            });
        });
    }
}
exports.Pool = Pool;
