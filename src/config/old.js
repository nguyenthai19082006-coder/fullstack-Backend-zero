require("dotenv").config(); // lấy giá trị bên file env

// Get the client
const mysql = require("mysql2");

// Create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, //nếu không truyền tham số này thì mặc định mysql sẽ hiểu giá trị default là 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
