const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  return Comment;
};
