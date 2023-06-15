import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'flappybirdonline',
    password: '123456'
})


export default pool;