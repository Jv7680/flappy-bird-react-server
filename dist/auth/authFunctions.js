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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFunctions = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secretSignature, tokenLife) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.default.sign({
            payload,
        }, secretSignature, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });
    }
    catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return false;
    }
});
const verifyToken = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessTokenDecoded = yield jsonwebtoken_1.default.verify(token, secretKey, {
            ignoreExpiration: true,
        });
        if (accessTokenDecoded) {
            return {
                userName: accessTokenDecoded.payload.userName,
                exp: accessTokenDecoded.exp,
            };
        }
        return false;
    }
    catch (error) {
        console.log("Error in verify access token", error);
        return false;
    }
});
const decodeToken = (token, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.default.verify(token, secretKey, {
            ignoreExpiration: true,
        });
    }
    catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return false;
    }
});
const isTokenExpired = (exp) => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = Date.now() / 1000;
    if (exp <= currentTime) {
        // token expired
        return true;
    }
    return false;
});
exports.AuthFunctions = {
    generateToken,
    verifyToken,
    decodeToken,
    isTokenExpired,
};
//# sourceMappingURL=authFunctions.js.map