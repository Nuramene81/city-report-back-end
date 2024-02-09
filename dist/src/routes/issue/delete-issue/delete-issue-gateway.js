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
exports.DeleteIssueGateway = void 0;
const db_pool_1 = require("../../../../db-pool");
const constants_1 = require("../../../../constants");
class DeleteIssueGateway {
    constructor() {
        this.pool = new db_pool_1.Pool();
        this.pool.connect(constants_1.DB_CONFIG_OPTIONS);
    }
    DeleteIssue(issueUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(`DELETE FROM "Issues" WHERE "ID" = $1;`, [
                issueUUID
            ]);
        });
    }
    GetIssueImageURLs(issueUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const issueImageURLs = [];
            const result = yield this.pool.query(`SELECT "ImageURL" FROM "IssueImages" WHERE "IssueUUID" = $1;`, [
                issueUUID
            ]);
            for (const row of result.rows) {
                issueImageURLs.push(row.ImageURL);
            }
            return issueImageURLs;
        });
    }
    DeleteIssueImages(issueUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(`DELETE FROM "IssueImages" WHERE "IssueUUID" = $1;`, [
                issueUUID
            ]);
        });
    }
}
exports.DeleteIssueGateway = DeleteIssueGateway;
