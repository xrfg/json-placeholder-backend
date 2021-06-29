const mongoose = require("mongoose");
require("dotenv").config();

// create mongoose connection
mongoose.connect(process.env.URL, {
  dbName: process.env.DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// listening for mongoose connection
mongoose.connection.on("open", () => console.log("db connected"));

// listening for any error
mongoose.connection.on("error", (err) => console.log(err.message));

// listening for disconnection
mongoose.connection.on("disconnected", () =>
  console.log("db connection disconnected")
);

// ctrl c
process.on("SIGINT", () => {
  mongoose.connection.close();
  process.exit();
});
