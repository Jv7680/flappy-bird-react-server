import express from "express";
import { AuthController } from "./authController";
const authRouter = express.Router();
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/loginGoogle', AuthController.loginGoogle);
authRouter.post('/registerGoogle', AuthController.registerGoogle);
authRouter.post('/refreshToken', AuthController.refreshToken);
export default authRouter;
//# sourceMappingURL=authRoutes.js.map