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
exports.UserModel = void 0;
const connectDB_1 = __importDefault(require("../configs/connectDB"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const TABLE_NAME = "users";
const checkUserNameExist = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [userRows] = yield connectDB_1.default.execute(`select * from ${TABLE_NAME} where userName = ?`, [userName]);
        if (userRows.length === 0) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.log("checkGmailExist error", error);
        return false;
    }
});
const checkGmailExist = (gmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [userRows] = yield connectDB_1.default.execute(`select * from ${TABLE_NAME} where gmail = ?`, [gmail]);
        if (userRows.length === 0) {
            return false;
        }
        return userRows[0].userName;
    }
    catch (error) {
        console.log("checkGmailExist error", error);
        return false;
    }
});
const checkFullNameExist = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [userRows] = yield connectDB_1.default.execute(`select * from ${TABLE_NAME} where fullName = ?`, [fullName]);
        if (userRows.length === 0) {
            return false;
        }
        const foundItem = Array.from(userRows).find((item) => item.fullName === fullName);
        if (foundItem) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log("checkFullNameExist error", error);
        return false;
    }
});
const getUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [userRows] = yield connectDB_1.default.execute(`select * from ${TABLE_NAME} where userName = ?`, [userName]);
        if (userRows.length === 0) {
            return false;
        }
        return userRows[0];
    }
    catch (error) {
        console.log("getUser error", error);
        return false;
    }
});
const getRankList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [rankList] = yield connectDB_1.default.execute(`select fullName, bestScore from ${TABLE_NAME} order by bestScore desc`);
        if (rankList.length === 0) {
            return false;
        }
        return rankList;
    }
    catch (error) {
        console.log("getRankList error", error);
        return false;
    }
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`insert into ${TABLE_NAME}(userName,password,fullName,gmail,accountType,bestScore,setting,refreshToken) values (?,?,?,?,?,?,?,?)`, Object.values(userData));
        return userData.userName;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
});
let resetUserPassword = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPassword = generateRandomString();
        const hashPassword = bcrypt_1.default.hashSync(newPassword, 10);
        yield connectDB_1.default.execute(`update ${TABLE_NAME} set password = ? where userName = ?`, [hashPassword, userName]);
        return newPassword;
    }
    catch (error) {
        console.log("resetUserPassword error", error);
        return false;
    }
});
let generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const minLength = 6;
    const maxLength = 10;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
};
const updateUserDetail = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`update ${TABLE_NAME} set fullName = ?, gmail = ? where userName = ?`, Object.values(userData));
        return true;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
});
const updateUserPassword = (userPasswordData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`update ${TABLE_NAME} set password = ? where userName = ?`, Object.values(userPasswordData));
        return true;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
});
const updateUserBestScore = (userName, bestScore) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`update ${TABLE_NAME} set bestScore = ? where userName = ?`, [bestScore, userName]);
        return true;
    }
    catch (error) {
        console.log("updateUserRefreshToken error", error);
        return false;
    }
});
const updateUserRefreshToken = (userName, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`update ${TABLE_NAME} set refreshToken = ? where userName = ?`, [refreshToken, userName]);
        return true;
    }
    catch (error) {
        console.log("updateUserRefreshToken error", error);
        return false;
    }
});
exports.UserModel = {
    checkUserNameExist,
    checkGmailExist,
    checkFullNameExist,
    getUser,
    getRankList,
    createUser,
    resetUserPassword,
    updateUserDetail,
    updateUserPassword,
    updateUserBestScore,
    updateUserRefreshToken,
};
//# sourceMappingURL=userModel.js.map