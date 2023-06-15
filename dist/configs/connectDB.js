"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'flappybirdonline',
//     password: '123456'
// })
const pool = promise_1.default.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b03c08dd04090e',
    database: 'heroku_2f64474ae5b76ab',
    password: 'abde4c75'
});
exports.default = pool;
//# sourceMappingURL=connectDB.js.map