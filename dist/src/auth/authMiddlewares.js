var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthFunctions } from './authFunctions';
import { UserModel } from '../user/userModel';
import { generateResponeData } from '../utils/functions';
import { errorCode } from '../utils/manageCode/errorCode';
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get access token from header
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json(generateResponeData(errorCode.missingAccessToken));
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    // verify access token
    const verified = yield AuthFunctions.verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!verified) {
        return res.status(400).json(generateResponeData(errorCode.accessTokenIlligal));
    }
    // check expired
    const isExpired = yield AuthFunctions.isTokenExpired(verified.exp);
    if (isExpired) {
        return res.status(400).json(generateResponeData(errorCode.accessTokenExpired));
    }
    // check user exist or not
    const user = yield UserModel.getUser(verified.userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNotFound));
    }
    req.userName = verified.userName;
    req.password = user.password;
    return next();
});
export const AuthMiddlewares = {
    isAuth,
};
//# sourceMappingURL=authMiddlewares.js.map