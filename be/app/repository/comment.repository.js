const { sequelize } = require("../../config/db.sequelize");
const commentModels = require("../models/comment.model")(sequelize);
const { Op, QueryTypes } = require("sequelize");

const create = async (data) => {
  const rows = await commentModels.create(data);

  return rows;
};

const findAll = async (post_id) => {
  const whereClause = {
    deletedAt: null,
  };

  if (post_id) {
    whereClause.post_id = post_id;
  }

  const rows = await commentModels.findAll({
    where: whereClause,
  });

  return rows;
};

const update = async (data, id) => {
  const rows = await commentModels.update(data, {
    where: {
      id,
    },
  });

  return rows;
};

const deleteData = async (id) => {
  const current_date = new Date();

  const rows = await commentModels.update(
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
