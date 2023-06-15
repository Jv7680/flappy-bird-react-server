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
exports.UserController = void 0;
const userModel_1 = require("./userModel");
let getUserDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    let user = yield userModel_1.UserModel.getUser(userId);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    return res.status(200).json({
        message: 'Success',
        data: Object.assign(Object.assign({}, user), { setting: JSON.parse(user.setting) })
    });
});
let createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`createUser`);
});
let updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`updateUser`);
});
let deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`deleteUser`);
});
exports.UserController = {
    getUserDetail,
    createUser,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=userController.js.map