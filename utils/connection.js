const config = require('../config');
const mysql = require('mysql2');

try {
    const pool = mysql.createPool({ host: config.mysqlHost, user: config.user, password: process.env.DB_PASS || config.password, database: config.database, port: config.mysqlPort });
    var promisePool = pool.promise();
    console.log("new connection stablish")
} catch (e) {
    console.log("Error connecting database ... nn", e);
}
module.exports = promisePool;
