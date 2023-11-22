const { BadRequestException } = require("../helpers/errors");
const { messages } = require("../helpers/messages");
const { userRepository } = require("../repository");

const listAllDataUser = async () => {
  const data = await userRepository.findAll();

  return data;
};

const createDataUser = async (username, email, password) => {
  if (!username || !email || !password)
    throw new BadRequestException(
      messages.FieldEmpty("Username, email, and password")
    );

  const fields_data = {
    username,
    email,
    password,
  };

  const result = await userRepository.create(fields_data);

  return result;
};

const updateDataUser = async (username, email, password, id) => {
  if (!id) throw new BadRequestException(messages.FieldEmpty("Id"));

  const fields_data = {
    username,
    email,
    password,
  };

  const result = await userRepository.update(fields_data, id);

  return result;
};

const deleteDataUser = async (id) => {
  if (!id) throw new BadRequestException(messages.FieldEmpty("Id"));
  const result = await userRepository.deleteData(id);

  return result;
};

module.exports = {
  listAllDataUser,
  createDataUser,
  updateDataUser,
  deleteDataUser,
};
