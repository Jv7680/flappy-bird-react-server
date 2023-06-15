import jwt from "jsonwebtoken";

const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await jwt.sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return false;
    }
};

const verifyToken = async (token, secretKey) => {
    try {
        const accessTokenDecoded = await jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        });
        if (accessTokenDecoded) {
            return {
                userName: (accessTokenDecoded).payload.userName,
                exp: (accessTokenDecoded).exp,
            };
        }

        return false;
    } catch (error) {
        console.log("Error in verify access token", error);
        return false;
    }
};

const decodeToken = async (token, secretKey) => {
    try {
        return await jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return false;
    }
};

const isTokenExpired = async (exp) => {
    const currentTime = Date.now() / 1000;
    if (exp <= currentTime) {
        // token expired
        return true;
    }
    return false;
};

export const AuthFunctions = {
    generateToken,
    verifyToken,
    decodeToken,
    isTokenExpired,
};