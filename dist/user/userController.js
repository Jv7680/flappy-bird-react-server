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
exports.UserController = void 0;
const userModel_1 = require("./userModel");
const functions_1 = require("../utils/functions");
const successCode_1 = require("../utils/manageCode/successCode");
const errorCode_1 = require("../utils/manageCode/errorCode");
const bcrypt_1 = __importDefault(require("bcrypt"));
let getUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
    let user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.userNotFound));
    }
    const data = {
        userName: user.userName,
        fullName: user.fullName,
        gmail: user.gmail,
        bestScore: user.bestScore,
        setting: JSON.parse(user.setting),
        accountType: user.accountType,
    };
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.getProfileSuccess, data));
});
let getRankList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let rankList = yield userModel_1.UserModel.getRankList();
    if (!rankList) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.getRankListFail));
    }
    const data = rankList;
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.getRankListSuccess, data));
});
let createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`createUser`);
});
let updateUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
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
    let isUpdated = yield userModel_1.UserModel.updateUserDetail(Object.assign(Object.assign({}, req.body), { userName }));
    if (!isUpdated) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.updateProfileFail));
    }
    let user = yield userModel_1.UserModel.getUser(userName);
    const data = {
        userName: user.userName,
        fullName: user.fullName,
        gmail: user.gmail,
        bestScore: user.bestScore,
        setting: JSON.parse(user.setting),
    };
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.updateProfileSuccess, data));
});
let updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordValid = bcrypt_1.default.compareSync(req.body.currentPassword, req.password);
    if (!isPasswordValid) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.incorrectPassword));
    }
    let userName = req.userName;
    const hashPassword = bcrypt_1.default.hashSync(req.body.newPassword, 10);
    let isUpdated = yield userModel_1.UserModel.updateUserPassword({ newPassword: hashPassword, userName });
    if (!isUpdated) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.updateUserPasswordFail));
    }
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.updatePasswordSuccess));
});
let updateUserBestScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
    let userBestScore = req.body.userBestScore;
    if (!userBestScore) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingBodyKey));
    }
    let result = yield userModel_1.UserModel.updateUserBestScore(userName, userBestScore);
    if (!result) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.updateUserBestScoreFail));
    }
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.updateBestScoreSuccess));
});
let deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`deleteUser`);
});
let checkUserExits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.params.userName;
    if (!userName) {
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingParamKey));
    }
    let result = yield userModel_1.UserModel.checkUserNameExist(userName);
    if (!result) {
        return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.checkUserExistSuccess, false));
    }
    return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.checkUserExistSuccess, true));
});
exports.UserController = {
    getUserDetail,
    getRankList,
    createUser,
    updateUserDetail,
    updateUserPassword,
    updateUserBestScore,
    deleteUser,
    checkUserExits,
};
//# sourceMappingURL=userController.js.map