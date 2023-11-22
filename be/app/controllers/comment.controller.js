"use strict";

const { messages } = require("../helpers/messages");
const { commentService } = require("../services");

const listDataComment = async (req, res) => {
  try {
    const { post_id } = req.query;

    const data = await commentService.listDataComment(post_id);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const createDataComment = async (req, res) => {
  try {
    const { name, message, rating, post_id } = req.body;

    const data = await commentService.createDataComment(
      name,
      message,
      rating,
      post_id
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const updateDataComment = async (req, res) => {
  try {
    const { name, message, rating, id } = req.body;

    const data = await commentService.updateDataComment(
      name,
      message,
      rating,
      id
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const deleteDataComment = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await commentService.deleteDataComment(id);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

module.exports = {
  createDataComment,
  listDataComment,
  updateDataComment,
  deleteDataComment,
};
