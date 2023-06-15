import pool from "../configs/connectDB";
import bcrypt from "bcrypt";

const TABLE_NAME = "users";

const checkUserNameExist = async (userName: string) => {
    try {
        let [userRows] = await pool.execute(`select * from ${TABLE_NAME} where userName = ?`, [userName]);
        if ((userRows as any).length === 0) {
            return false;
        }

        return true;
    }
    catch (error) {
        console.log("checkGmailExist error", error);
        return false;
    }
};

const checkGmailExist = async (gmail: string) => {
    try {
        let [userRows] = await pool.execute(`select * from ${TABLE_NAME} where gmail = ?`, [gmail]);
        if ((userRows as any).length === 0) {
            return false;
        }

        return (userRows as any)[0].userName;
    }
    catch (error) {
        console.log("checkGmailExist error", error);
        return false;
    }
};

const checkFullNameExist = async (fullName: string) => {
    try {
        let [userRows] = await pool.execute(`select * from ${TABLE_NAME} where fullName = ?`, [fullName]);
        if ((userRows as any).length === 0) {
            return false;
        }

        const foundItem = Array.from(userRows as any).find((item: any) => item.fullName === fullName);
        if (foundItem) {
            return true;
        }

        return false;
    }
    catch (error) {
        console.log("checkFullNameExist error", error);
        return false;
    }
};

const getUser = async (userName: string) => {
    try {
        let [userRows] = await pool.execute(`select * from ${TABLE_NAME} where userName = ?`, [userName]);
        if ((userRows as any).length === 0) {
            return false;
        }

        return (userRows as any)[0];
    }
    catch (error) {
        console.log("getUser error", error);
        return false;
    }
};

const getRankList = async () => {
    try {
        let [rankList] = await pool.execute(`select fullName, bestScore from ${TABLE_NAME} order by bestScore desc`);
        if ((rankList as any).length === 0) {
            return false;
        }

        return (rankList as any);
    }
    catch (error) {
        console.log("getRankList error", error);
        return false;
    }
};

const createUser = async (userData: any) => {
    try {
        await pool.execute(`insert into ${TABLE_NAME}(userName,password,fullName,gmail,accountType,bestScore,setting,refreshToken) values (?,?,?,?,?,?,?,?)`, Object.values(userData));
        return userData.userName;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
};

let resetUserPassword = async (userName: string) => {
    try {
        const newPassword = generateRandomString();
        const hashPassword = bcrypt.hashSync(newPassword, 10);

        await pool.execute(`update ${TABLE_NAME} set password = ? where userName = ?`, [hashPassword, userName]);
        return newPassword;
    }
    catch (error) {
        console.log("resetUserPassword error", error);
        return false;
    }
};

let generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const minLength = 6;
    const maxLength = 10;

    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
};

const updateUserDetail = async (userData: any) => {
    try {
        await pool.execute(`update ${TABLE_NAME} set fullName = ?, gmail = ? where userName = ?`, Object.values(userData));
        return true;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
};

const updateUserPassword = async (userPasswordData: any) => {
    try {
        await pool.execute(`update ${TABLE_NAME} set password = ? where userName = ?`, Object.values(userPasswordData));
        return true;
    }
    catch (error) {
        console.log("createUser error", error);
        return false;
    }
};

const updateUserBestScore = async (userName: string, bestScore: number) => {
    try {
        await pool.execute(`update ${TABLE_NAME} set bestScore = ? where userName = ?`, [bestScore, userName]);
        return true;
    } catch (error) {
        console.log("updateUserRefreshToken error", error);
        return false;
    }
};

const updateUserRefreshToken = async (userName: string, refreshToken: string) => {
    try {
        await pool.execute(`update ${TABLE_NAME} set refreshToken = ? where userName = ?`, [refreshToken, userName]);
        return true;
    } catch (error) {
        console.log("updateUserRefreshToken error", error);
        return false;
    }
};

export const UserModel = {
    checkUserNameExist,
    checkGmailExist,
    checkFullNameExist,
    getUser,
    getRankList,
    createUser,
    resetUserPassword,
    updateUserDetail,
    updateUserPassword,
    updateUserBestScore,
    updateUserRefreshToken,
};