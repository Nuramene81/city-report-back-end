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
exports.AddIssueTransaction = void 0;
const issue_image_1 = require("../models/issue-image");
const USER_ERROR = 'User doesnt exist';
class AddIssueTransaction {
    constructor(gateway) {
        this.gateway = gateway;
    }
    Add(issueRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.addIssueRequest = issueRequest;
            yield this.validateRequest();
            this.issueUUID = yield this.gateway.AddIssue(this.addIssueRequest);
            yield this.addIssueImages(this.addIssueRequest.issueImages);
        });
    }
    validateRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateUser();
        });
    }
    validateUser() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.gateway.IsExistingUser((_a = this.addIssueRequest.reportedBy) === null || _a === void 0 ? void 0 : _a.userUUID))) {
                throw new Error(USER_ERROR);
            }
        });
    }
    addIssueImages(imageURLs) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const imageURL of imageURLs) {
                yield this.gateway.AddIssueImage(new issue_image_1.IssueImage(undefined, this.issueUUID, imageURL));
            }
        });
    }
}
exports.AddIssueTransaction = AddIssueTransaction;
