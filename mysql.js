const mysql = require('mysql');

const pool = mysql.createPool({
//Colocando as variaveis de ambiente
    "user" : process.env.MYSQL_USER, 
    "password" : process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT,
});

exports.pool = pool;