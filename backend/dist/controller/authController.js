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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.checkAuth = exports.signin = exports.signup = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const validation_1 = require("../validation/validation");
const cludinary_config_1 = __importDefault(require("../utils/cludinary.config"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = validation_1.signupSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).send({
            message: "invalid format"
        });
        return;
    }
    const { username, email, password, image } = result.data;
    try {
        const alreadyExist = yield db_1.client.user.findUnique({
            where: {
                email
            }
        });
        if (alreadyExist) {
            return res.status(409).json({
                message: "User already exists!",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 7);
        const response = yield db_1.client.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                Image: image
            }
        });
        res.status(200).json({
            message: "account created succesfully !!",
            user: Object.assign(Object.assign({}, response), { password: null })
        });
    }
    catch (e) {
        res.json({
            message: `error in the signup function is :\n${e}`
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = validation_1.loginSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).send({
            message: "invalid format"
        });
        return;
    }
    const { email, password } = result.data;
    try {
        const user = yield db_1.client.user.findUnique({
            where: {
                email
            }
        });
        const hashedPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (hashedPassword === false) {
            res.status(400).json({
                message: "unauthorized"
            });
            return;
        }
        else {
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.Id }, JWT_SECRET);
            res.status(201).json({
                message: "user logged in succesfully !!",
                token
            });
        }
    }
    catch (e) {
        res.status(401).send({
            message: `the error is :\n${e}`
        });
    }
});
exports.signin = signin;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = Number(req.userId);
        const response = yield db_1.client.user.findUnique({
            where: {
                Id
            }
        });
        if (response) {
            res.json({
                user: Object.assign(Object.assign({}, response), { password: null })
            });
        }
        else {
            res.status(404).json({
                message: "user not found !!"
            });
        }
    }
    catch (e) {
        res.json({
            message: `error in checkAuth Controller is ${e}`
        });
    }
});
exports.checkAuth = checkAuth;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileImage } = req.body;
        if (!profileImage) {
            res.status(401).json({
                message: "unable to upload the image hhh"
            });
            return;
        }
        const userId = req.userId;
        const response = yield cludinary_config_1.default.uploader.upload(profileImage);
        console.log(response);
        const updatedUser = yield db_1.client.user.update({
            where: {
                Id: Number(userId),
            },
            data: {
                Image: response.secure_url,
            },
        });
        res.status(201).json({
            message: "user updated ",
            user: Object.assign(Object.assign({}, updatedUser), { password: null })
        });
    }
    catch (e) {
        res.status(401).json({
            message: `error in the updateProfile function is : ${e} `
        });
    }
});
exports.updateProfile = updateProfile;
