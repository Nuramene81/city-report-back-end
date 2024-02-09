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
exports.GetIssuesGateway = void 0;
const db_pool_1 = require("../../../../db-pool");
const constants_1 = require("../../../../constants");
const issue_1 = require("../models/issue");
const user_1 = require("../../user/models/user");
class GetIssuesGateway {
    constructor() {
        this.pool = new db_pool_1.Pool();
        this.sqlString = '';
        this.pool.connect(constants_1.DB_CONFIG_OPTIONS);
    }
    GetIssues(searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchString) {
                this.sqlString = `
      SELECT * FROM "Issues" 
        WHERE "Title" ILIKE '%${searchString}%' 
        OR "Description" ILIKE '%${searchString}%' 
        ORDER BY "DateReported" DESC;`;
            }
            else {
                this.sqlString = `SELECT * FROM "Issues" ORDER BY "DateReported" DESC;`;
            }
            const data = yield this.pool.query(this.sqlString, []);
            if (data.rows.length === 0) {
                return [];
            }
            return yield this.makeIssues(data);
        });
    }
    makeIssues(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const issues = [];
            for (const row of data.rows) {
                issues.push(new issue_1.Issue(row.ID, row.Title, yield this.getUser(row.ReportedByUserUUID), row.Description, row.IssueLatitude, row.IssueLongitude, new Date(row.DateReported).toISOString().split('T')[0], row.Status, yield this.getIssueImages(row.ID)));
            }
            return issues;
        });
    }
    getUser(userUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.pool.query(`SELECT * FROM "Users" WHERE "ID" = $1;`, [
                userUUID
            ]);
            return new user_1.User(user.rows[0].ID, user.rows[0].FullName, user.rows[0].Username);
        });
    }
    getIssueImages(issueUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageURLs = [];
            const data = yield this.pool.query(`SELECT * FROM "IssueImages" WHERE "IssueUUID" = $1;`, [
                issueUUID
            ]);
            data.rows.forEach((row) => {
                imageURLs.push(row.ImageURL);
            });
            return imageURLs;
        });
    }
}
exports.GetIssuesGateway = GetIssuesGateway;
