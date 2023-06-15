"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const authMiddlewares_1 = require("../auth/authMiddlewares");
const userRouter = express_1.default.Router();
userRouter.get("/detail", authMiddlewares_1.AuthMiddlewares.isAuth, userController_1.UserController.getUserDetail);
userRouter.get("/rankList", userController_1.UserController.getRankList);
userRouter.get("/checkUserExist/:userName", userController_1.UserController.checkUserExits);
// userRouter.post("/create", UserController.createUser);
userRouter.put("/updateScore", authMiddlewares_1.AuthMiddlewares.isAuth, userController_1.UserController.updateUserBestScore);
userRouter.patch("/updateUserDetail", authMiddlewares_1.AuthMiddlewares.isAuth, userController_1.UserController.updateUserDetail);
userRouter.patch("/updateUserPassword", authMiddlewares_1.AuthMiddlewares.isAuth, userController_1.UserController.updateUserPassword);
userRouter.patch("/updateUserBestScore", authMiddlewares_1.AuthMiddlewares.isAuth, userController_1.UserController.updateUserBestScore);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map