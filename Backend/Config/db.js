require("dotenv").config();
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//mySql connect coonection 
connection.connect((err) => {
    if(err) {
        console.log("MySql is not successfully connected")
    }
    else {
        console.log("MySql is successfully connected")
    }
})


module.exports = connection;