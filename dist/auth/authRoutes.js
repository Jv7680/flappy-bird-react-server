"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const authRouter = express_1.default.Router();
authRouter.post('/login', authController_1.AuthController.login);
authRouter.post('/register', authController_1.AuthController.register);
authRouter.post('/refresh', authController_1.AuthController.refreshToken);
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map