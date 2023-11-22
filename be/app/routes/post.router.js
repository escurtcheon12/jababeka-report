"use strict";

const { postController } = require("../controllers");
const { multerLibrary } = require("../libraries");

module.exports = (router) => {
  router.group("/post", (router) => {
    router.get("/list", postController.listAllDataPost);
    router.get("/delete/:id", postController.deleteDataPost);
    router.post("/create", multerLibrary.uploadImage, postController.createDataPost);
    router.post("/update", multerLibrary.uploadImage, postController.updateDataPost);
  });
};
