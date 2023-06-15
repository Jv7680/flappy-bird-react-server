export interface User {
    userName: string;
    password: string;
    fullName: string;
    gmail: string;
    accountType: number;
    score: number;
    bestScore: number;
    setting: string;
    refreshToken: string;
};

export interface CodeData {
    code: number;
    message: string;
};

export interface ResponseData<T> {
    status: number;
    code: number;
    message: string;
    data: T;
};