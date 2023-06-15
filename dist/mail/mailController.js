"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const google_auth_library_1 = require("google-auth-library");
const functions_1 = require("../utils/functions");
const successCode_1 = require("../utils/manageCode/successCode");
const errorCode_1 = require("../utils/manageCode/errorCode");
const userModel_1 = require("../user/userModel");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
// init OAuth2Client
const myOAuth2Client = new google_auth_library_1.OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
// set refresh token for OAuth2Client
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});
let sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Lấy thông tin gửi lên từ client qua body
        const { toGmail, title, content, warning } = req.body;
        if (!toGmail || !title || !content || !warning) {
            return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.missingBodyKey));
        }
        // check gmail exist
        const userNameFromGmail = yield userModel_1.UserModel.checkGmailExist(toGmail);
        if (!userNameFromGmail) {
            return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.gmailNotFound));
        }
        // get token object
        const myAccessTokenObject = yield myOAuth2Client.getAccessToken().catch((error) => {
            console.log("myOAuth2Client.getAccessToken error", error);
            return Promise.reject(false);
        });
        if (!myAccessTokenObject) {
            return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.getMailTokenFail));
        }
        // get access token
        const myAccessToken = myAccessTokenObject.token;
        // get new password
        const newPassword = yield userModel_1.UserModel.resetUserPassword(userNameFromGmail);
        if (!newPassword) {
            return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.resetPasswordFail));
        }
        // config transport
        const transport = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken
            },
        });
        // config sent object
        const mailOptions = {
            to: toGmail,
            subject: title,
            html: `<h2>${content} ${newPassword}</h2><div style="color:red;">${warning}</div>`,
        };
        // send
        yield transport.sendMail(mailOptions);
        return res.status(200).json((0, functions_1.generateResponeData)(successCode_1.successCode.sendMailSuccess, ""));
    }
    catch (error) {
        console.log("error in send mail", error);
        return res.status(400).json((0, functions_1.generateResponeData)(errorCode_1.errorCode.sendMailFail));
    }
});
exports.MailController = {
    sendMail,
};
//# sourceMappingURL=mailController.js.map