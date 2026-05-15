const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connceting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
