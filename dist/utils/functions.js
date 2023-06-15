"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.generateResponeData = void 0;
/*
code: 0-fail 1-success
*/
const generateResponeData = (codeData, data = "") => {
    const responeData = {
        status: codeData.code < 400 ? 200 : 400,
        code: codeData.code,
        message: codeData.message,
        data,
    };
    return responeData;
};
exports.generateResponeData = generateResponeData;
const generateCode = (code, message) => {
    const codeData = {
        code,
        message,
    };
    return codeData;
};
exports.generateCode = generateCode;
//# sourceMappingURL=functions.js.map