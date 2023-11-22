"use strict";

const { userController } = require("../controllers");

module.exports = (router) => {
  router.group("/user", (router) => {
    router.get("/list", userController.listAllDataUser);
    router.get("/delete/:id", userController.deleteDataUser);
    router.post("/create", userController.createDataUser);
    router.post("/update", userController.updateDataUser);
  });
};
