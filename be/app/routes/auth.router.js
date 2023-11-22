const { authController } = require("../controllers");

module.exports = (router) => {
  router.group("/auth", (router) => {
    router.post("/login", authController.login);
    router.post("/register", authController.register);
  });
};
