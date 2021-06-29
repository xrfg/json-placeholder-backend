const express = require("express");
const port = 3010;
const createError = require("http-errors");
const cors = require("cors");
const { auth } = require("./middlewares/Auth");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
require("./mongooseConnection");
const app = express();

// cors middleware
app.use(cors({ origin: "*", exposedHeaders: "x-auth" }));

app.use(express.json());

app.use("/users", userRoutes);

app.use("/posts", auth, postRoutes);

app.listen(port, () =>
  console.log(`express server is running on port: ${port}`)
);

app.use((req, res, next) => {
  let err = createError(404, "pagenotfound");
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});
