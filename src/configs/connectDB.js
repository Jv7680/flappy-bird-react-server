import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'flappybirdonline',
//     password: '123456'
// })

const pool = mysql.createPool({
    host: 'aws-instance.cruo6qsyugvo.ap-southeast-2.rds.amazonaws.com',
    user: 'tinadmin',
    database: 'flappybird',
    password: '123456789&'
})

export default pool;