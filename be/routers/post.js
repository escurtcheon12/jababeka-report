const express = require("express");
const db = require("../config/db");
const env = require("dotenv");
env.config();
const path = require("path");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 1 * 1024 * 1024;
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg format allowed"));
    }
  },
  limits: { fileSize: maxSize },
}).single("image");

router.get("/list", (req, res) => {
  db.query("SELECT * FROM post", (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      data: result,
    });
  });
});

router.post("/listAll", (req, res) => {
  const { post_category } = req.body;

  db.query(
    "SELECT * FROM post WHERE post_category = ?",
    [post_category],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        data: result,
      });
    }
  );
});

router.post("/listDetail", (req, res) => {
  const { post_category, user_id } = req.body;

  let query = "SELECT * FROM post WHERE post_category = ?";

  if (user_id) query += " AND user_id = ?";

  db.query(query, [post_category, user_id], (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      data: result,
    });
  });
});

router.post("/download", function (req, res) {
  const { post_attachment, user_id } = req.body;

  db.query(
    "SELECT * FROM post WHERE post_attachment = ? and user_id = ?",
    [post_attachment, user_id],
    (err, result) => {
      const file = `${__dirname}/../public/uploads/upload_file/${result.data.post_attachment}`;
      res.download(file);
    }
  );
});

router.put(`/updateImage/:id`, (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    }

    const id = req.params.id;
    const { post_text_report, post_location } = req.body;
    const imageName = req.file.filename;

    db.query(
      "UPDATE post SET post_text_report = ?, post_location = ?, post_image = ? WHERE post_id = ?",
      [post_text_report, post_location, imageName, id],
      (err, result) => {
        res.json({
          code: result ? 202 : 404,
          status: result ? "succes" : "error",
          data: result ? result : err,
        });
      }
    );
  });
});

router.put(`/update/:id`, (req, res) => {
  const id = req.params.id;
  const { post_text_report, post_location } = req.body;

  db.query(
    "UPDATE post SET post_text_report = ?, post_location = ? WHERE post_id = ?",
    [post_text_report, post_location, id],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        data: result,
      });
    }
  );
});

router.put(`/changeStatus/:id`, (req, res) => {
  const id = req.params.id;
  const { post_status } = req.body;

  db.query(
    "UPDATE post SET post_status = ? WHERE post_id = ?",
    [post_status, id],
    (err, result) => {
      res.json({
        code: result ? 202 : 404,
        status: result ? "succes" : "error",
        data: result,
      });
    }
  );
});

router.delete(`/delete/:id`, (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM post WHERE post_id = ?", [id], (err, result) => {
    res.json({
      code: result ? 202 : 404,
      status: result ? "succes" : "error",
      data: result,
    });
  });
});

module.exports = router;
