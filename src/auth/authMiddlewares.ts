import { AuthFunctions } from './authFunctions';
import { UserModel } from '../user/userModel';
import { generateResponeData } from '../utils/functions';
import { errorCode } from '../utils/manageCode/errorCode';
import { successCode } from '../utils/manageCode/successCode';

const isAuth = async (req: any, res: any, next: any) => {
    // get access token from header
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json(generateResponeData(errorCode.missingAccessToken));
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    // verify access token
    const verified = await AuthFunctions.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return res.status(400).json(generateResponeData(errorCode.accessTokenIlligal));
    }

    // check expired
    const isExpired = await AuthFunctions.isTokenExpired(verified.exp);
    if (isExpired) {
        return res.status(400).json(generateResponeData(errorCode.accessTokenExpired));
    }

    // check user exist or not
    const user = await UserModel.getUser(verified.userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNotFound));
    }

    req.userName = verified.userName;
    req.password = user.password;

    return next();
};

export const AuthMiddlewares = {
    isAuth,
};