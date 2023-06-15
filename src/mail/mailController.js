import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import { generateResponeData } from "../utils/functions";
import { successCode } from "../utils/manageCode/successCode";
import { errorCode } from "../utils/manageCode/errorCode";
import { UserModel } from '../user/userModel';

import * as dotenv from 'dotenv';
dotenv.config();

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

// init OAuth2Client
const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);

// set refresh token for OAuth2Client
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

let sendMail = async (req, res) => {
    try {
        // Lấy thông tin gửi lên từ client qua body
        const { toGmail, title, content, warning } = req.body
        if (!toGmail || !title || !content || !warning) {
            return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
        }

        // check gmail exist
        const userNameFromGmail = await UserModel.checkGmailExist(toGmail);
        if (!userNameFromGmail) {
            return res.status(400).json(generateResponeData(errorCode.gmailNotFound));
        }

        // get token object
        const myAccessTokenObject = await myOAuth2Client.getAccessToken().catch((error) => {
            console.log("myOAuth2Client.getAccessToken error", error);
            return Promise.reject(false);
        });
        if (!myAccessTokenObject) {
            return res.status(400).json(generateResponeData(errorCode.getMailTokenFail));
        }
        // get access token
        const myAccessToken = myAccessTokenObject.token;

        // get new password
        const newPassword = await UserModel.resetUserPassword(userNameFromGmail);
        if (!newPassword) {
            return res.status(400).json(generateResponeData(errorCode.resetPasswordFail));
        }

        // config transport
        const transport = nodemailer.createTransport({
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
        await transport.sendMail(mailOptions);

        return res.status(200).json(generateResponeData(successCode.sendMailSuccess, ""));
    } catch (error) {
        console.log("error in send mail", error)
        return res.status(400).json(generateResponeData(errorCode.sendMailFail));
    }
};


export const MailController = {
    sendMail,
};
