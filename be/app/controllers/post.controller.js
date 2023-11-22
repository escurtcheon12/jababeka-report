"use strict";

const { messages } = require("../helpers/messages");
const { postService } = require("../services");

const listAllDataPost = async (req, res) => {
  try {
    const { user_id, category } = req.query;

    const data = await postService.listAllDataPost(user_id, category);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const createDataPost = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";
    const { author, category, header, location, status, user_id } = req.body;

    const data = await postService.createDataPost(
      author,
      category,
      header,
      location,
      status,
      image,
      user_id
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const updateDataPost = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { author, category, header, location, status, user_id, id } =
      req.body;

    const data = await postService.updateDataPost(
      author,
      category,
      header,
      location,
      status,
      image,
      user_id,
      id
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const deleteDataPost = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await postService.deleteDataPost(id);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

module.exports = {
  listAllDataPost,
  createDataPost,
  updateDataPost,
  deleteDataPost,
};
