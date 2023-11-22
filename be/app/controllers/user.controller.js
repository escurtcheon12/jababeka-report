"use strict";

const { messages } = require("../helpers/messages");
const { userService } = require("../services");

const listAllDataUser = async (req, res) => {
  try {
    const data = await userService.listAllDataUser();

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const createDataUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const data = await userService.createDataUser(username, email, password);

    return res
      .status(200)
      .json({ status: "success", message: messages.SaveSuccess });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const updateDataUser = async (req, res) => {
  try {
    const { username, email, password, id } = req.body;

    const data = await userService.updateDataUser(
      username,
      email,
      password,
      id
    );

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const deleteDataUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await userService.deleteDataUser(id);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

module.exports = {
  listAllDataUser,
  createDataUser,
  updateDataUser,
  deleteDataUser,
};
