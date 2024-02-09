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
exports.editIssueHandler = void 0;
const edit_issue_gateway_1 = require("./edit-issue-gateway");
const edit_issue_transaction_1 = require("./edit-issue-transaction");
const issue_1 = require("../models/issue");
const user_1 = require("../../user/models/user");
function editIssueHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new edit_issue_transaction_1.EditIssueTransaction(new edit_issue_gateway_1.EditIssueGateway());
        try {
            yield transaction.Update(makeRequestIntoIssueRequest(req));
            res.status(204).json({ message: 'Issue updated successfully' });
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
exports.editIssueHandler = editIssueHandler;
function makeRequestIntoIssueRequest(req) {
    const request = new issue_1.Issue(req.params.issueUUID, req.body.title, new user_1.User(req.session.userUUID), req.body.description, req.body.issueLatitude, req.body.issueLongitude);
    return request;
}
