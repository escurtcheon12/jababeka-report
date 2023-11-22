const express = require("express");
const db = require("../config/db");
const env = require("dotenv");
env.config();
const router = express.Router();

router.get("/list", (req, res) => {
  db.query("SELECT * FROM comment", (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      loginStatus: result.length > 0 ? "succes" : "none",
      data: result,
    });
  });
});

router.post("/add", (req, res) => {
  const { comment_name, comment_text, post_id } = req.body;

  db.query(
    "INSERT INTO comment(comment_name, comment_text, post_id) VALUES(?,?,?)",
    [comment_name, comment_text, post_id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.json({ code: 500, status: "error", data: err });
      }

      res.json({
        code: result ? 202 : 404,
        status: result ? "success" : "error",
        loginStatus: result ? "success" : "none",
        data: result,
      });
    }
  );
});

router.put(`/update/:id`, (req, res) => {
  const id = req.params.id;
  const { comment_text, comment_rating } = req.body;

  db.query(
    "UPDATE comment SET comment_text = ? , comment_rating = ? WHERE comment_id = ?",
    [comment_text, comment_rating, id],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        loginStatus: result ? "succes" : "none",
        data: result,
      });
    }
  );
});

router.delete(`/delete/:id`, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM comment WHERE comment_id = ?", [id], (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      loginStatus: result.length > 0 ? "succes" : "none",
      data: result,
    });
  });
});

module.exports = router;
