"use strict";

const { messages } = require("../helpers/messages");
const { authService } = require("../services");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const data = await authService.login(username, password);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log('err', err);
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password, repeat_password } = req.body;

    const data = await authService.register(
      username,
      email,
      phone,
      password,
      repeat_password
    );

    console.log('data', data);

    return res.status(200).json({ status: "success", data });
  } catch (err) {
    console.log(err.message)
    return res
      .status(err.status || 500)
      .json({ status: "failed", message: err.message || messages.ServerError });
  }
};

module.exports = { login, register };
