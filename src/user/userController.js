import { UserModel } from "./userModel";
import { generateResponeData } from "../utils/functions";
import { successCode } from "../utils/manageCode/successCode";
import { errorCode } from "../utils/manageCode/errorCode";
import bcrypt from "bcrypt";

let getUserDetail = async (req, res) => {
    let userName = req.userName;
    let user = await UserModel.getUser(userName);
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
};

let getRankList = async (req, res) => {
    let rankList = await UserModel.getRankList();
    if (!rankList) {
        return res.status(400).json(generateResponeData(errorCode.getRankListFail));
    }

    const data = rankList;
    return res.status(200).json(generateResponeData(successCode.getRankListSuccess, data));
};

let createUser = async (req, res) => {
    res.send(`createUser`);
};

let updateUserDetail = async (req, res) => {
    let userName = req.userName;

    // check fullName exist
    const fullNameExist = await UserModel.checkFullNameExist(req.body.fullName);
    if (fullNameExist) {
        return res.status(400).json(generateResponeData(errorCode.fullNameExisted));
    }

    // check gmail match with user
    const gmailmatch = await UserModel.checkGmailMatchWithUser(req.body.gmail, userName);

    // check gmail exist
    const gmailExist = await UserModel.checkGmailExist(req.body.gmail);
    if (!gmailmatch && gmailExist && req.body.gmail.length > 0) {
        return res.status(400).json(generateResponeData(errorCode.gmailExisted));
    }

    let isUpdated = await UserModel.updateUserDetail({ ...req.body, userName });
    if (!isUpdated) {
        return res.status(400).json(generateResponeData(errorCode.updateProfileFail));
    }

    let user = await UserModel.getUser(userName);
    const data = {
        userName: user.userName,
        fullName: user.fullName,
        gmail: user.gmail,
        bestScore: user.bestScore,
        setting: JSON.parse(user.setting),
    };
    return res.status(200).json(generateResponeData(successCode.updateProfileSuccess, data));
};

let updateUserPassword = async (req, res) => {
    const isPasswordValid = bcrypt.compareSync(req.body.currentPassword, req.password);
    if (!isPasswordValid) {
        return res.status(400).json(generateResponeData(errorCode.incorrectPassword));
    }

    let userName = req.userName;
    const hashPassword = bcrypt.hashSync(req.body.newPassword, 10);
    let isUpdated = await UserModel.updateUserPassword({ newPassword: hashPassword, userName });
    if (!isUpdated) {
        return res.status(400).json(generateResponeData(errorCode.updateUserPasswordFail));
    }

    return res.status(200).json(generateResponeData(successCode.updatePasswordSuccess));
};

let updateUserBestScore = async (req, res) => {
    let userName = req.userName;

    let userBestScore = req.body.userBestScore;
    if (!userBestScore) {
        return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
    }

    let result = await UserModel.updateUserBestScore(userName, userBestScore);
    if (!result) {
        return res.status(400).json(generateResponeData(errorCode.updateUserBestScoreFail));
    }

    return res.status(200).json(generateResponeData(successCode.updateBestScoreSuccess));
};

let deleteUser = async (req, res) => {
    res.send(`deleteUser`);
};

let checkUserExits = async (req, res) => {
    let userName = req.params.userName;
    if (!userName) {
        return res.status(400).json(generateResponeData(errorCode.missingParamKey));
    }

    let result = await UserModel.checkUserNameExist(userName);
    if (!result) {
        return res.status(200).json(generateResponeData(successCode.checkUserExistSuccess, false));
    }

    return res.status(200).json(generateResponeData(successCode.checkUserExistSuccess, true));
};

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
