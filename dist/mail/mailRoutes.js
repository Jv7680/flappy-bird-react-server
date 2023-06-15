"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mailController_1 = require("./mailController");
const mailRouter = express_1.default.Router();
mailRouter.post("/send", mailController_1.MailController.sendMail);
exports.default = mailRouter;
//# sourceMappingURL=mailRoutes.js.map