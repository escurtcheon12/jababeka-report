const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING(150),
      defaultValue: null,
    },
    password: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  return User;
};
