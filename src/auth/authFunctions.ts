import jwt from "jsonwebtoken";

const generateToken = async (payload: any, secretSignature: any, tokenLife: any) => {
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

const verifyToken = async (token: any, secretKey: any) => {
    try {
        const accessTokenDecoded = await jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        });
        if (accessTokenDecoded) {
            return {
                userName: (accessTokenDecoded as any).payload.userName,
                exp: (accessTokenDecoded as any).exp,
            };
        }

        return false;
    } catch (error) {
        console.log("Error in verify access token", error);
        return false;
    }
};

const decodeToken = async (token: any, secretKey: any) => {
    try {
        return await jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return false;
    }
};

const isTokenExpired = async (exp: number) => {
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