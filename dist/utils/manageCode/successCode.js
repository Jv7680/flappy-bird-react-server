"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successCode = void 0;
const functions_1 = require("../functions");
exports.successCode = {
    createUser: (0, functions_1.generateCode)(201, "Create user success"),
    login: (0, functions_1.generateCode)(202, "Logged in successfully"),
    refreshAccessToken: (0, functions_1.generateCode)(203, "Refresh access token successfully"),
    getProfileSuccess: (0, functions_1.generateCode)(204, "Get user profile successfully"),
    updateProfileSuccess: (0, functions_1.generateCode)(205, "Update user profile successfully"),
    updatePasswordSuccess: (0, functions_1.generateCode)(206, "Update user password successfully"),
    updateBestScoreSuccess: (0, functions_1.generateCode)(207, "Update user best score successfully"),
    sendMailSuccess: (0, functions_1.generateCode)(208, "Send mail successfully"),
    getRankListSuccess: (0, functions_1.generateCode)(209, "Get rank list successfully"),
    checkUserExistSuccess: (0, functions_1.generateCode)(210, "Check user exist successfully"),
};
//# sourceMappingURL=successCode.js.map