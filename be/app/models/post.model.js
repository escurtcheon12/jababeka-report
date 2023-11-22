const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    category: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    header: {
      type: DataTypes.STRING(150),
      defaultValue: null,
    },
    location: {
      type: DataTypes.STRING(80),
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Waiting", "Finish"],
      defaultValue: "Waiting",
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: 0,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  return Post;
};
