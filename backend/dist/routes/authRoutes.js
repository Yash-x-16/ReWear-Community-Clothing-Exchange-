"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controller/authController.js");
const middleware_js_1 = require("../Middleware/middleware.js");
const router = express_1.default.Router();
router.post('/signup', authController_js_1.signup);
router.post('/signin', authController_js_1.signin);
router.get('/checkAuth', middleware_js_1.Middleware, authController_js_1.checkAuth);
exports.default = router;
