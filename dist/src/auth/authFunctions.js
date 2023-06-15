var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
const generateToken = (payload, secretSignature, tokenLife) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jwt.sign({
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
        const accessTokenDecoded = yield jwt.verify(token, secretKey, {
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
        return yield jwt.verify(token, secretKey, {
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
export const AuthFunctions = {
    generateToken,
    verifyToken,
    decodeToken,
    isTokenExpired,
};
//# sourceMappingURL=authFunctions.js.map