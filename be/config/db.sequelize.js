"use strict";

const db_config = require("./config");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = {};
const models = path.join(__dirname, "../models");

const sequelize = new Sequelize(
  db_config.database.name,
  db_config.database.user,
  db_config.database.password,
  {
    host: db_config.database.host,
    dialect: db_config.database.dialect,
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: db_config.database.pool.max,
      min: db_config.database.pool.min,
      acquire: db_config.database.pool.acquire,
      idle: db_config.database.pool.idle,
    },
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
