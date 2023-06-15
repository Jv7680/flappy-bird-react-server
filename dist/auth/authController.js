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
exports.AuthController = void 0;
const rand_token_1 = __importDefault(require("rand-token"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authFunctions_1 = require("./authFunctions");
const userModel_1 = require("../user/userModel");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const user = yield userModel_1.UserModel.getUser(userName);
    if (user) {
        res.status(400).send('This user name already exist');
    }
    else {
        const hashPassword = bcrypt_1.default.hashSync(req.body.password, 10);
        const newUser = {
            userName: userName,
            password: hashPassword,
            fullName: req.body.fullName,
            gmail: req.body.gmail,
            accountType: req.body.accountType,
            score: req.body.score,
            bestScore: req.body.bestScore,
            setting: req.body.setting,
        };
        const createdUserName = yield userModel_1.UserModel.createUser(newUser);
        if (!createdUserName) {
            return res.status(400).json({
                message: 'Error in create user',
            });
        }
        console.log("createdUserName", createdUserName);
        return res.status(200).json({
            message: `Create user ${createdUserName} success`,
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName.toLowerCase() || 'test';
    const password = req.body.password || '12345';
    const user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(401).send('Tên đăng nhập không tồn tại.');
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Mật khẩu không chính xác.');
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const dataForAccessToken = {
        userName: user.userName,
    };

    const accessToken = yield authFunctions_1.AuthFunctions.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res
            .status(401)
            .send('Đăng nhập không thành công, vui lòng thử lại.');
    }
    let refreshToken = rand_token_1.default.generate(+(process.env.REFRESH_TOKEN_SIZE || 100)); // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        yield userModel_1.UserModel.updateUserRefreshToken(user.userName, refreshToken);
    }
    else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refreshToken = user.refreshToken;
    }
    return res.json({
        msg: 'Đăng nhập thành công.',
        accessToken,
        refreshToken,
        user,
    });
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.');
    }
    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.');
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    // Decode access token đó
    const decoded = yield authFunctions_1.AuthFunctions.decodeToken(accessTokenFromHeader, accessTokenSecret);
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.');
    }
    const userName = decoded.payload.userName; // Lấy userName từ payload
    const user = yield userModel_1.UserModel.getUser(userName);
    if (!user) {
        return res.status(401).send('User không tồn tại.');
    }
    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token không hợp lệ.');
    }
    // Tạo access token mới
    const dataForAccessToken = {
        userName,
    };
    const accessToken = yield authFunctions_1.AuthFunctions.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res
            .status(400)
            .send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
        accessToken,
    });
});
exports.AuthController = {
    login,
    register,
    refreshToken,
};
//# sourceMappingURL=authController.js.map