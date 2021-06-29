const express = require("express");

const Route = express.Router();

const { userVS } = require("../middlewares/validation-sanitization");

const { postUser, loginUser } = require("../controllers/userControllers");

// const { auth } = require("../middlewares/Auth");

Route.route("/").post(userVS, postUser);
Route.post("/login", loginUser);

module.exports = Route;
