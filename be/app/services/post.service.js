const { BadRequestException } = require("../helpers/errors");
const { messages } = require("../helpers/messages");
const { postRepository } = require("../repository");

const listAllDataPost = async (user_id, category) => {
  const result = await postRepository.findAll(user_id, category);

  return result;
};

const createDataPost = async (
  author,
  category,
  header,
  location,
  status,
  image
) => {
  const fields_data = {
    author,
    category,
    header,
    location,
    status,
    image,
  };

  if (!author || !category || !header || !location || !image) {
    throw new BadRequestException(
      messages.FieldEmpty("Author, category, header, location, and image")
    );
  }

  const result = await postRepository.create(fields_data);
  return result;
};

const updateDataPost = async (
  author,
  category,
  header,
  location,
  status,
  image,
  user_id,
  id
) => {
  if (!id) throw new BadRequestException(messages.FieldEmpty("Id"));

  const fields_data = {
    author,
    category,
    header,
    location,
    status,
    user_id,
  };

  if (image) {
    fields_data.image = image;
  }

  const result = await postRepository.update(fields_data, id);
  return result;
};

const deleteDataPost = async (id) => {
  if (!id) {
    throw new BadRequestException(messages.FieldEmpty("Id"));
  }

  const result = await postRepository.deleteData(id);
  return result;
};

module.exports = {
  listAllDataPost,
  createDataPost,
  updateDataPost,
  deleteDataPost,
};
