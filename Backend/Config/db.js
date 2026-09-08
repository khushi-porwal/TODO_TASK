const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySql@123",
    database: "Task_App_Schema"
})

module.exports = connection;