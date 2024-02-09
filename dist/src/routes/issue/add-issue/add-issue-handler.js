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
exports.addIssueHandler = void 0;
const add_issue_gateway_1 = require("./add-issue-gateway");
const add_issue_transaction_1 = require("./add-issue-transaction");
const issue_1 = require("../models/issue");
const user_1 = require("../../user/models/user");
const cloudinary_1 = require("cloudinary");
const uuid_1 = require("uuid");
cloudinary_1.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
const imageURLs = [];
function addIssueHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = new add_issue_transaction_1.AddIssueTransaction(new add_issue_gateway_1.AddIssueGateway());
        try {
            if (req.files) {
                for (const file of req.files) {
                    const result = yield new Promise((resolve, reject) => {
                        cloudinary_1.v2.uploader.upload_stream({
                            resource_type: 'auto',
                            public_id: (0, uuid_1.v4)(),
                            buffer: file.buffer
                        }, (err, result) => {
                            if (err) {
                                console.log('error uploading to cloudinary');
                                console.log(err);
                                reject(err);
                            }
                            else {
                                console.log('uploaded to cloudinary');
                                resolve(result);
                            }
                        }).end(file.buffer);
                    }).then((result) => {
                        return result;
                    });
                    console.log(result);
                    imageURLs.push(result.secure_url);
                }
                ;
            }
            yield transaction.Add(makeRequestIntoIssueRequest(req));
            imageURLs.length = 0;
            res.status(201).json({ message: 'Issue created' });
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
exports.addIssueHandler = addIssueHandler;
function makeRequestIntoIssueRequest(req) {
    const request = new issue_1.Issue(undefined, req.body.title, new user_1.User(req.session.userUUID), req.body.description, req.body.latitude, req.body.longitude, undefined, undefined, imageURLs);
    return request;
}
