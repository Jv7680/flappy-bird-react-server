import { generateCode } from "../functions";
export const successCode = {
    createUser: generateCode(201, "Create user success"),
    login: generateCode(202, "Logged in successfully"),
    refreshAccessToken: generateCode(203, "Refresh access token successfully"),
    getProfileSuccess: generateCode(204, "Get user profile successfully"),
    updateProfileSuccess: generateCode(205, "Update user profile successfully"),
    updatePasswordSuccess: generateCode(206, "Update user password successfully"),
    updateBestScoreSuccess: generateCode(207, "Update user best score successfully"),
    sendMailSuccess: generateCode(208, "Send mail successfully"),
    getRankListSuccess: generateCode(209, "Get rank list successfully"),
    checkUserExistSuccess: generateCode(210, "Check user exist successfully"),
};
//# sourceMappingURL=successCode.js.map