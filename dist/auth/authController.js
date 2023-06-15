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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authFunctions_1 = require("./authFunctions");
const userModel_1 = require("../user/userModel");
const functions_1 = require("../utils/functions");
const successCode_1 = require("../utils/manageCode/successCode");
const errorCode_1 = require("../utils/manageCode/errorCode");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    // check user exist
    const user = yield userModel_1.UserModel.getUser(userName);
    if (user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userExisted));
    }
    // check fullName exist
    const fullNameExist = yield userModel_1.UserModel.checkFullNameExist(req.body.fullName);
    if (fullNameExist) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.fullNameExisted));
    }
    // check gmail exist
    const gmailExist = yield userModel_1.UserModel.checkGmailExist(req.body.gmail);
    if (gmailExist && req.body.gmail.length > 0) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.gmailExisted));
    }
    const hashPassword = bcrypt_1.default.hashSync(req.body.password, 10);
    const newUser = Object.assign(Object.assign({}, req.body), { password: hashPassword });
    const createdUserName = yield userModel_1.UserModel.createUser(newUser);
    if (!createdUserName) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.createUser));
    }
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.createUser, createdUserName));
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const password = req.body.password;
    if (!userName || !password) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingBodyKey));
    }
    const user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userNameNotExist));
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.incorrectPassword));
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenPayload = {
        userName: user.userName,
    };
    const accessToken = yield authFunctions_1.AuthFunctions.generateToken(accessTokenPayload, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.generateAccessToken));
    }
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenPayload = {
        userName: user.userName,
    };
    let refreshToken = yield authFunctions_1.AuthFunctions.generateToken(refreshTokenPayload, refreshTokenSecret, refreshTokenLife);
    if (!refreshToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.generateRefreshToken));
    }
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        yield userModel_1.UserModel.updateUserRefreshToken(user.userName, refreshToken);
    }
    else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }
    const data = {
        accessToken,
        refreshToken,
    };
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.login, data));
});
const registerGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    if (!userName || !fullName) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingBodyKey));
    }
    // check fullName exist
    const fullNameExist = yield userModel_1.UserModel.checkFullNameExist(fullName);
    if (fullNameExist) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.fullNameExisted));
    }
    const newUser = Object.assign({}, req.body);
    const createdUserName = yield userModel_1.UserModel.createUser(newUser);
    if (!createdUserName) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.createUser));
    }
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.createUser, createdUserName));
});
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    if (!userName) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingBodyKey));
    }
    const user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userNameNotExist));
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenPayload = {
        userName: userName,
    };
    const accessToken = yield authFunctions_1.AuthFunctions.generateToken(accessTokenPayload, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.generateAccessToken));
    }
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenPayload = {
        userName: userName,
    };
    let refreshToken = yield authFunctions_1.AuthFunctions.generateToken(refreshTokenPayload, refreshTokenSecret, refreshTokenLife);
    if (!refreshToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.generateRefreshToken));
    }
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        yield userModel_1.UserModel.updateUserRefreshToken(user.userName, refreshToken);
    }
    else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }
    const data = {
        accessToken,
        refreshToken,
    };
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.login, data));
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get access token from body
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingAccessToken));
    }
    // get refresh token from body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingRefreshToken));
    }
    // verify access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenVerified = yield authFunctions_1.AuthFunctions.verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!accessTokenVerified) {
        return res.status(401).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.accessTokenIlligal));
    }
    // check user exist or not
    const userName = accessTokenVerified.userName;
    const user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userNotFound));
    }
    // verify refresh token
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenVerified = yield authFunctions_1.AuthFunctions.verifyToken(refreshTokenFromBody, refreshTokenSecret);
    if (!refreshTokenVerified) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.refreshTokenIlligal));
    }
    // check refresh token expired
    const isRefreshExpired = yield authFunctions_1.AuthFunctions.isTokenExpired(refreshTokenVerified.exp);
    if (isRefreshExpired) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.refreshTokenExpired));
    }
    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.refreshTokenIlligal));
    }
    // create new access token
    const accessTokenPayload = {
        userName: user.userName,
    };
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessToken = yield authFunctions_1.AuthFunctions.generateToken(accessTokenPayload, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.generateAccessToken));
    }
    const data = {
        accessToken,
    };
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.refreshAccessToken, data));
});
exports.AuthController = {
    register,
    login,
    registerGoogle,
    loginGoogle,
    refreshToken,
};
//# sourceMappingURL=authController.js.map