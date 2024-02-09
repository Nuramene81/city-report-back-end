"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryObj = void 0;
const cloudinary_1 = require("cloudinary");
exports.cloudinaryObj = cloudinary_1.v2.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
