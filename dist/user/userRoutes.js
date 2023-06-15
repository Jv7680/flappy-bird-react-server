"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const userRouter = express_1.default.Router();
userRouter.get("/detail/:userId", userController_1.UserController.getUserDetail);
userRouter.post("/create", userController_1.UserController.createUser);
userRouter.put("/update/:userId", userController_1.UserController.updateUser);
userRouter.delete("/delete/:userId", userController_1.UserController.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map