"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
cloudinary_1.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLUDINARY_SECRET,
    api_name: process.env.CLOUDINARY_API_NAME
});
exports.default = cloudinary_1.v2;
