"use strict";

const { commentController } = require("../controllers");

module.exports = (router) => {
  router.group("/comment", (router) => {
    router.get("/list", commentController.listDataComment);
    router.get("/delete/:id", commentController.deleteDataComment);
    router.post("/create", commentController.createDataComment);
    router.post("/update", commentController.updateDataComment);
  });
};
