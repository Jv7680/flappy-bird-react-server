import express from "express";
import { MailController } from "./mailController";

const mailRouter = express.Router();

mailRouter.post("/send", MailController.sendMail);

export default mailRouter;