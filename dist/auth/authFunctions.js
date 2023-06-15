"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFunctions = void 0;
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const generateToken = (payload, secretSignature, tokenLife) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield sign({
            payload,
        }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });
    }
    catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
});
const verifyToken = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield verify(token, secretKey);
    }
    catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
});
const decodeToken = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield verify(token, secretKey, {
            ignoreExpiration: true,
        });
    }
    catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
});
exports.AuthFunctions = {
    generateToken,
    verifyToken,
    decodeToken,
};
//# sourceMappingURL=authFunctions.js.map