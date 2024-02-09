"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const add_issue_handler_1 = require("./add-issue/add-issue-handler");
const get_issues_handler_1 = require("./get-issues/get-issues-handler");
const delete_issue_handler_1 = require("./delete-issue/delete-issue-handler");
const edit_issue_handler_1 = require("./edit-issue/edit-issue-handler");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.route('/')
    .post(upload.array('images'), add_issue_handler_1.addIssueHandler)
    .get(get_issues_handler_1.getIssuesHandler);
router.route('/:issueUUID')
    .delete(delete_issue_handler_1.deleteIssueHandler)
    .put(edit_issue_handler_1.editIssueHandler);
const issueRoutes = router;
exports.issueRoutes = issueRoutes;
