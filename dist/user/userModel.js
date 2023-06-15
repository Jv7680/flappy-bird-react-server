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
const TABLE_NAME = "users";
const getUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    let [userRows] = yield connectDB_1.default.execute(`select * from ${TABLE_NAME} where userName = ?`, [userName]);
    if (userRows.length === 0) {
        return false;
    }
    return userRows[0];
});
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectDB_1.default.execute(`insert into ${TABLE_NAME}(userName,password,fullName,gmail,accountType,score,bestScore,setting) values (?,?,?,?,?,?,?,?)`, Object.values(userData));
        return userData.userName;
    }
    catch (error) {
        console.log("createUser error", error);
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
    getUser,
    createUser,
    updateUserRefreshToken,
};
//# sourceMappingURL=userModel.js.map