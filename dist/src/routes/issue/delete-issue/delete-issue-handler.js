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
exports.deleteIssueHandler = void 0;
const delete_issue_gateway_1 = require("../delete-issue/delete-issue-gateway");
const delete_issue_transaction_1 = require("../delete-issue/delete-issue-transaction");
function deleteIssueHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new delete_issue_transaction_1.DeleteIssueTransaction(new delete_issue_gateway_1.DeleteIssueGateway());
        try {
            yield transaction.Delete(req.params.issueUUID);
            res.status(201).json({ message: 'Issue deleted successfully' });
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
exports.deleteIssueHandler = deleteIssueHandler;
