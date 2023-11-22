const { sequelize } = require("../../config/db.sequelize");
const postModels = require("../models/post.model")(sequelize);
const { Op, QueryTypes } = require("sequelize");

const create = async (data) => {
  const rows = await postModels.create(data);

  return rows;
};

const findAll = async (user_id, category) => {
  const whereClause = {
    deletedAt: null,
  };

  if (user_id && user_id != 0) whereClause.user_id = Number(user_id);
  if (category) whereClause.category = category;

  const rows = await postModels.findAll({
    where: whereClause,
  });

  return rows;
};

const update = async (data, id) => {
  const rows = await postModels.update(data, {
    where: {
      id,
    },
  });

  return rows;
};

const deleteData = async (id) => {
  const current_date = new Date();

  const rows = await postModels.update(
    { deletedAt: current_date },
    {
      where: {
        id,
      },
    }
  );

  return rows;
};

module.exports = { create, findAll, update, deleteData };
