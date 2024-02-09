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
exports.AddIssueGateway = void 0;
const db_pool_1 = require("../../../../db-pool");
const constants_1 = require("../../../../constants");
class AddIssueGateway {
    constructor() {
        this.pool = new db_pool_1.Pool();
        this.pool.connect(constants_1.DB_CONFIG_OPTIONS);
    }
    IsExistingUser(userUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.pool.query(`SELECT * FROM "Users" 
        WHERE "ID" = $1;`, [
                userUUID
            ]);
            return data.rowCount > 0;
        });
    }
    AddIssue(issue) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.pool.query(`INSERT INTO "Issues" (
        "Title", "ReportedByUserUUID", "Description", "IssueLatitude", "IssueLongitude",
        "DateReported", "Status"
      )
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ID";`, [
                issue.title,
                (_a = issue.reportedBy) === null || _a === void 0 ? void 0 : _a.userUUID,
                issue.description,
                issue.issueLatitude,
                issue.issueLongitude,
                new Date().toISOString(),
                'Open'
            ]);
            return data.rows[0].ID;
        });
    }
    AddIssueImage(issueImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.pool.query(`INSERT INTO "IssueImages" (
        "IssueUUID", "ImageURL"
      )
        VALUES ($1, $2);`, [
                issueImage.issueUUID,
                issueImage.imageURL
            ]);
        });
    }
}
exports.AddIssueGateway = AddIssueGateway;
