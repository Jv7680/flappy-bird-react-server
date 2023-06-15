import express from "express";
import { UserController } from "./userController";
import { AuthMiddlewares } from "../auth/authMiddlewares";

const userRouter = express.Router();

userRouter.get("/detail", AuthMiddlewares.isAuth, UserController.getUserDetail);
userRouter.get("/rankList", UserController.getRankList);
userRouter.get("/checkUserExist/:userName", UserController.checkUserExits);

// userRouter.post("/create", UserController.createUser);
userRouter.put("/updateScore", AuthMiddlewares.isAuth, UserController.updateUserBestScore);
userRouter.patch("/updateUserDetail", AuthMiddlewares.isAuth, UserController.updateUserDetail);
userRouter.patch("/updateUserPassword", AuthMiddlewares.isAuth, UserController.updateUserPassword);
userRouter.patch("/updateUserBestScore", AuthMiddlewares.isAuth, UserController.updateUserBestScore);

export default userRouter;