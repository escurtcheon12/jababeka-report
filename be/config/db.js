
const mysql = require("mysql2");

module.exports = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin@A1',
  database: process.env.DB_DATABASE || 'jababeka_report',
});
