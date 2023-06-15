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
exports.AuthMiddlewares = void 0;
const authFunctions_1 = require("./authFunctions");
const userModel_1 = require("../user/userModel");
const functions_1 = require("../utils/functions");
const errorCode_1 = require("../utils/manageCode/errorCode");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get access token from header
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingAccessToken));
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // verify access token
    const verified = yield authFunctions_1.AuthFunctions.verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!verified) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.accessTokenIlligal));
    }
    // check expired
    const isExpired = yield authFunctions_1.AuthFunctions.isTokenExpired(verified.exp);
    if (isExpired) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.accessTokenExpired));
    }
    // check user exist or not
    const user = yield userModel_1.UserModel.getUser(verified.userName);
    if (!user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userNotFound));
    }
    req.userName = verified.userName;
    req.password = user.password;
    return next();
});
exports.AuthMiddlewares = {
    isAuth,
};
//# sourceMappingURL=authMiddlewares.js.map