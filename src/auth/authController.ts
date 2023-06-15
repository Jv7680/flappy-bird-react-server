import bcrypt from "bcrypt";
import { AuthFunctions } from "./authFunctions";
import { UserModel } from "../user/userModel";
import { User } from "../utils/interface";
import { generateResponeData } from "../utils/functions";
import { successCode } from "../utils/manageCode/successCode";
import { errorCode } from "../utils/manageCode/errorCode";

const register = async (req: any, res: any) => {
    const userName = req.body.userName;

    // check user exist
    const user = await UserModel.getUser(userName);
    if (user) {
        return res.status(400).json(generateResponeData(errorCode.userExisted));
    }

    // check fullName exist
    const fullNameExist = await UserModel.checkFullNameExist(req.body.fullName);
    if (fullNameExist) {
        return res.status(400).json(generateResponeData(errorCode.fullNameExisted));
    }

    // check gmail exist
    const gmailExist = await UserModel.checkGmailExist(req.body.gmail);
    if (gmailExist && req.body.gmail.length > 0) {
        return res.status(400).json(generateResponeData(errorCode.gmailExisted));
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser: User = { ...(req.body as User), password: hashPassword };

    const createdUserName = await UserModel.createUser(newUser);
    if (!createdUserName) {
        return res.status(400).json(generateResponeData(errorCode.createUser));
    }

    return res.status(200).json(generateResponeData(successCode.createUser, createdUserName));
};

const login = async (req: any, res: any) => {
    const userName = req.body.userName;
    const password = req.body.password;
    if (!userName || !password) {
        return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
    }

    const user = await UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNameNotExist));
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json(generateResponeData(errorCode.incorrectPassword));
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenPayload = {
        userName: user.userName,
    };
    const accessToken = await AuthFunctions.generateToken(
        accessTokenPayload,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res.status(400).json(generateResponeData(errorCode.generateAccessToken));
    }

    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenPayload = {
        userName: user.userName,
    };
    let refreshToken = await AuthFunctions.generateToken(
        refreshTokenPayload,
        refreshTokenSecret,
        refreshTokenLife,
    );
    if (!refreshToken) {
        return res.status(400).json(generateResponeData(errorCode.generateRefreshToken));
    }

    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await UserModel.updateUserRefreshToken(user.userName, refreshToken);
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }

    const data = {
        accessToken,
        refreshToken,
    };
    return res.status(200).json(generateResponeData(successCode.login, data));
};

const registerGoogle = async (req: any, res: any) => {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    if (!userName || !fullName) {
        return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
    }

    // check fullName exist
    const fullNameExist = await UserModel.checkFullNameExist(fullName);
    if (fullNameExist) {
        return res.status(400).json(generateResponeData(errorCode.fullNameExisted));
    }

    const newUser: User = { ...(req.body as User) };

    const createdUserName = await UserModel.createUser(newUser);
    if (!createdUserName) {
        return res.status(400).json(generateResponeData(errorCode.createUser));
    }

    return res.status(200).json(generateResponeData(successCode.createUser, createdUserName));
};

const loginGoogle = async (req: any, res: any) => {
    const userName = req.body.userName;
    if (!userName) {
        return res.status(400).json(generateResponeData(errorCode.missingBodyKey));
    }

    const user = await UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNameNotExist));
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenPayload = {
        userName: userName,
    };
    const accessToken = await AuthFunctions.generateToken(
        accessTokenPayload,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res.status(400).json(generateResponeData(errorCode.generateAccessToken));
    }

    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenPayload = {
        userName: userName,
    };
    let refreshToken = await AuthFunctions.generateToken(
        refreshTokenPayload,
        refreshTokenSecret,
        refreshTokenLife,
    );
    if (!refreshToken) {
        return res.status(400).json(generateResponeData(errorCode.generateRefreshToken));
    }

    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await UserModel.updateUserRefreshToken(user.userName, refreshToken);
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }

    const data = {
        accessToken,
        refreshToken,
    };
    return res.status(200).json(generateResponeData(successCode.login, data));
};

const refreshToken = async (req: any, res: any) => {
    // get access token from body
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json(generateResponeData(errorCode.missingAccessToken));
    }

    // get refresh token from body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).json(generateResponeData(errorCode.missingRefreshToken));
    }

    // verify access token
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenVerified = await AuthFunctions.verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!accessTokenVerified) {
        return res.status(401).json(generateResponeData(errorCode.accessTokenIlligal));
    }

    // check user exist or not
    const userName = accessTokenVerified.userName;
    const user = await UserModel.getUser(userName);
    if (!user) {
        return res.status(400).json(generateResponeData(errorCode.userNotFound));
    }

    // verify refresh token
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const refreshTokenVerified = await AuthFunctions.verifyToken(
        refreshTokenFromBody,
        refreshTokenSecret,
    );
    if (!refreshTokenVerified) {
        return res.status(400).json(generateResponeData(errorCode.refreshTokenIlligal));
    }

    // check refresh token expired
    const isRefreshExpired = await AuthFunctions.isTokenExpired(refreshTokenVerified.exp);
    if (isRefreshExpired) {
        return res.status(400).json(generateResponeData(errorCode.refreshTokenExpired));
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).json(generateResponeData(errorCode.refreshTokenIlligal));
    }

    // create new access token
    const accessTokenPayload = {
        userName: user.userName,
    };

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessToken = await AuthFunctions.generateToken(
        accessTokenPayload,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res.status(400).json(generateResponeData(errorCode.generateAccessToken));
    }

    const data = {
        accessToken,
    };
    return res.status(200).json(generateResponeData(successCode.refreshAccessToken, data));
};

export const AuthController = {
    register,
    login,
    registerGoogle,
    loginGoogle,
    refreshToken,
};