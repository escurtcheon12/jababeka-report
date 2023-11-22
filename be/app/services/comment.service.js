const { BadRequestException } = require("../helpers/errors");
const { messages } = require("../helpers/messages");
const { commentRepository } = require("../repository");

const createDataComment = async (name, message, rating, post_id) => {
  const fields_data = {
    name,
    message,
    rating,
    post_id,
  };

  const result = await commentRepository.create(fields_data);
  return result;
};

const listDataComment = async (post_id) => {
  const result = await commentRepository.findAll(post_id);
  return result;
};

const updateDataComment = async (name, message, rating, id) => {
  if (!id) throw new BadRequestException(messages.FieldEmpty("Id"));

  const fields_data = {
    name,
    message,
    rating,
  };

  const result = await commentRepository.update(fields_data, id);
  return result;
};

const deleteDataComment = async (id) => {
  if (!id) {
    throw new BadRequestException(messages.FieldEmpty("Id"));
  }

  const result = await commentRepository.deleteData(id);
  return result;
};

module.exports = {
  createDataComment,
  listDataComment,
  updateDataComment,
  deleteDataComment,
};
