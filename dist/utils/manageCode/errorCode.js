"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCode = void 0;
const functions_1 = require("../functions");
exports.errorCode = {
    userExisted: (0, functions_1.generateCode)(401, "This username already exist"),
    createUser: (0, functions_1.generateCode)(402, "Error in create user"),
    missingBodyKey: (0, functions_1.generateCode)(403, "Missing required key in body"),
    userNameNotExist: (0, functions_1.generateCode)(404, "Username does not exist"),
    incorrectPassword: (0, functions_1.generateCode)(405, "Incorrect password"),
    generateAccessToken: (0, functions_1.generateCode)(406, "Error in generate access token"),
    generateRefreshToken: (0, functions_1.generateCode)(407, "Error in generate refresh token"),
    missingAccessToken: (0, functions_1.generateCode)(408, "Missing access token"),
    missingRefreshToken: (0, functions_1.generateCode)(409, "Missing refresh token"),
    accessTokenIlligal: (0, functions_1.generateCode)(410, "Access token illigal"),
    refreshTokenIlligal: (0, functions_1.generateCode)(411, "Refresh token illigal"),
    userNotFound: (0, functions_1.generateCode)(412, "User not found"),
    accessTokenExpired: (0, functions_1.generateCode)(413, "Access token expired"),
    refreshTokenExpired: (0, functions_1.generateCode)(414, "Refresh token expired"),
    updateProfileFail: (0, functions_1.generateCode)(415, "Update user profile fail"),
    updateUserPasswordFail: (0, functions_1.generateCode)(416, "Update user password fail"),
    updateUserBestScoreFail: (0, functions_1.generateCode)(417, "Update user best score fail"),
    sendMailFail: (0, functions_1.generateCode)(418, "Send mail fail"),
    getMailTokenFail: (0, functions_1.generateCode)(418, "Can not get mail token"),
    gmailNotFound: (0, functions_1.generateCode)(419, "Gmail not found"),
    resetPasswordFail: (0, functions_1.generateCode)(420, "Reset password fail"),
    gmailExisted: (0, functions_1.generateCode)(421, "This gmail already used"),
    getRankListFail: (0, functions_1.generateCode)(422, "Can not get rank list"),
    fullNameExisted: (0, functions_1.generateCode)(423, "This fullname already used"),
    missingParamKey: (0, functions_1.generateCode)(424, "Missing required param key"),
};
//# sourceMappingURL=errorCode.js.map