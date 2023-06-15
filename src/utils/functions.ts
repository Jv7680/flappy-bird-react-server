import { ResponseData, CodeData } from "./interface";

/* 
code: 0-fail 1-success
*/
export const generateResponeData = (codeData: CodeData, data: any = "") => {
    const responeData: ResponseData<any> = {
        status: codeData.code < 400 ? 200 : 400,
        code: codeData.code,
        message: codeData.message,
        data,
    };

    return responeData;
};

export const generateCode = (code: number, message: string) => {
    const codeData: CodeData = {
        code,
        message,
    };

    return codeData;
};