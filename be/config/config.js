const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  server: {
    port: process.env.PORT || 4000,
    hostname: process.env.HOSTNAME || "admin",
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin@A1",
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || "jababeka_report_v2",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

module.exports = config;
