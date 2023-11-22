const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.post("/login", (req, res) => {
  const { user_name, user_password } = req.body;

  db.query(
    "SELECT * FROM user WHERE user_name = ? and user_password = ?",
    [user_name, user_password],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        loginStatus: result && result.length > 0 ? "succes" : "none",
        data: result,
      });
    }
  );
});

router.post("/filterRegister", (req, res) => {
  const { user_name, user_email, user_phone } = req.body;

  db.query(
    "SELECT * FROM user WHERE user_name = ? or user_email = ? or user_phone = ? ",
    [user_name, user_email, user_phone],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        desc: result.length > 0 ? "exist" : "none",
        data: result ? result : err,
      });
    }
  );
});

router.get("/list", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      loginStatus: result.length > 0 ? "succes" : "none",
      data: result,
    });
  });
});

router.post("/add", (req, res) => {
  const { user_name, user_email, user_phone, user_password } = req.body;

  db.query(
    "INSERT INTO user(user_name, user_email, user_phone, user_password) VALUES(?,?,?,?)",
    [user_name, user_email, user_phone, user_password],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        loginStatus: result.length > 0 ? "succes" : "none",
        data: result,
      });
    }
  );
});

module.exports = router;
