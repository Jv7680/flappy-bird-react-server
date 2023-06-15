import mysql from 'mysql2/promise';
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'flappybirdonline',
//     password: '123456'
// })
const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b03c08dd04090e',
    database: 'heroku_2f64474ae5b76ab',
    password: 'abde4c75'
});
export default pool;
//# sourceMappingURL=connectDB.js.map