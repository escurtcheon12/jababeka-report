const { sequelize } = require("../../config/db.sequelize");
const userModels = require("../models/user.model")(sequelize);
const { Op, QueryTypes } = require("sequelize");

const getByUsernameAndPassword = async (username, password) => {
  const rows = await userModels.findOne({
    where: {
      [Op.and]: {
        username,
        password,
        deletedAt: null,
      },
    },
  });

  return rows;
};

const findAll = async () => {
  const rows = await userModels.findAll({
    where: { deletedAt: null },
  });

  return rows;
};

const create = async (data) => {
  const rows = await userModels.create(data);

  return rows;
};

const getByOneKeyColumn = async (value, key) => {
  const rows = await userModels.findOne({
    where: { [Op.and]: { [key]: value }, deletedAt: null },
  });

  return rows;
};

const update = async (data, id) => {
  const rows = await userModels.update(data, {
    where: {
      id,
    },
  });

  return rows;
};

const deleteData = async (id) => {
  const current_date = new Date();

  const rows = await userModels.update(
    { deletedAt: current_date },
    {
      where: {
        id,
      },
    }
  );

  return rows;
};

module.exports = {
  getByUsernameAndPassword,
  findAll,
  create,
  getByOneKeyColumn,
  deleteData,
  update,
};
