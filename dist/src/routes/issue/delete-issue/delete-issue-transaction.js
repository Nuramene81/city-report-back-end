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
exports.DeleteIssueTransaction = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class DeleteIssueTransaction {
    constructor(gateway) {
        this.gateway = gateway;
    }
    Delete(issueUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DeleteIssueImages(issueUUID);
            yield this.gateway.DeleteIssue(issueUUID);
        });
    }
    DeleteIssueImages(issueUUID) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const imageURLs = yield this.gateway.GetIssueImageURLs(issueUUID);
            for (const imageURL of imageURLs) {
                const publicID = (_a = imageURL.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                yield cloudinary_1.v2.uploader.destroy(publicID);
            }
            yield this.gateway.DeleteIssueImages(issueUUID);
        });
    }
}
exports.DeleteIssueTransaction = DeleteIssueTransaction;
