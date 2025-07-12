"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../Middleware/middleware");
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.post('/updateProfle', middleware_1.Middleware, authController_1.updateProfile);
router.get('/profile', middleware_1.Middleware);
exports.default = router;
