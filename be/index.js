const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
// const user = require("./routers/user");
// const post = require("./routers/post");
// const comment = require("./routers/comment");
// const db = require("./config/db");
const config = require("./config/config");
const sequelize_database = require("./config/db.sequelize");
const routes = require("./app/routes");
const cookieParser = require("cookie-parser");
const path = require("path");
const { messages } = require("./app/helpers/messages");
const app = express();

sequelize_database.sequelize
  .sync()
  .then((res) => {
    console.log("Database connected through sequelize", res.models);
  })
  .catch((err) => {
    console.log("Database disconnected through sequelize" + err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(routes());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.use("/api/user", user);
// app.use("/api/post", post);
// app.use("/api/comment", comment);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;

  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({ message: messages.ServerError });
});

async function startServer() {
  app.listen(config.server.port, (err) => {
    if (err) {
      process.exit(1);
    }
    console.log("Port opened at " + config.server.port);
  });
}

startServer();
