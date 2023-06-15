var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "./userModel";
import { generateResponeData } from "../utils/functions";
import { successCode } from "../utils/manageCode/successCode";
import { errorCode } from "../utils/manageCode/errorCode";
import bcrypt from "bcrypt";
let getUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
    let user = yield UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNotFound));
    }
    const data = {
        userName: user.userName,
        fullName: user.fullName,
        gmail: user.gmail,
        bestScore: user.bestScore,
        setting: JSON.parse(user.setting),
        accountType: user.accountType,
    };
    return res.status(200).json(generateResponeData(successCode.getProfileSuccess, data));
});
let getRankList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let rankList = yield UserModel.getRankList();
    if (!rankList) {
        return res.status(400).json(generateResponeData(errorCode.getRankListFail));
    }
    const data = rankList;
    return res.status(200).json(generateResponeData(successCode.getRankListSuccess, data));
});
let createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`createUser`);
});
let updateUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
    // check fullName exist
    const fullNameExist = yield UserModel.checkFullNameExist(req.body.fullName);
    if (fullNameExist) {
        return res.status(400).json(generateResponeData(errorCode.fullNameExisted));
    }
    // check gmail exist
    const gmailExist = yield UserModel.checkGmailExist(req.body.gmail);
    if (gmailExist && req.body.gmail.length > 0) {
        return res.status(400).json(generateResponeData(errorCode.gmailExisted));
    }
    let isUpdated = yield UserModel.updateUserDetail(Object.assign(Object.assign({}, req.body), { userName }));
    if (!isUpdated) {
        return res.status(400).json(generateResponeData(errorCode.updateProfileFail));
    }
    let user = yield UserModel.getUser(userName);
    const data = {
        userName: user.userName,
        fullName: user.fullName,
        gmail: user.gmail,
        bestScore: user.bestScore,
        setting: JSON.parse(user.setting),
    };
    return res.status(200).json(generateResponeData(successCode.updateProfileSuccess, data));
});
let updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordValid = bcrypt.compareSync(req.body.currentPassword, req.password);
    if (!isPasswordValid) {
        return res.status(400).json(generateResponeData(errorCode.incorrectPassword));
    }
    let userName = req.userName;
    const hashPassword = bcrypt.hashSync(req.body.newPassword, 10);
    let isUpdated = yield UserModel.updateUserPassword({ newPassword: hashPassword, userName });
    if (!isUpdated) {
        return res.status(400).json(generateResponeData(errorCode.updateUserPasswordFail));
    }
    return res.status(200).json(generateResponeData(successCode.updatePasswordSuccess));
});
let updateUserBestScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.userName;
    let userBestScore = req.body.userBestScore;
    if (!userBestScore) {
        return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
    }
    let result = yield UserModel.updateUserBestScore(userName, userBestScore);
    if (!result) {
        return res.status(400).json(generateResponeData(errorCode.updateUserBestScoreFail));
    }
    return res.status(200).json(generateResponeData(successCode.updateBestScoreSuccess));
});
let deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`deleteUser`);
});
let checkUserExits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = req.params.userName;
    if (!userName) {
        return res.status(400).json(generateResponeData(errorCode.missingParamKey));
    }
    let result = yield UserModel.checkUserNameExist(userName);
    if (!result) {
        return res.status(200).json(generateResponeData(successCode.checkUserExistSuccess, false));
    }
    return res.status(200).json(generateResponeData(successCode.checkUserExistSuccess, true));
});
export const UserController = {
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