const express = require("express");

const Route = express.Router();

const { postVS } = require("../middlewares/validation-sanitization"); // see if valid when u post it

const {
  getPosts,
  getSinglePost,
  postPost,
  patchPost,
  deletePost,
} = require("../controllers/postControllers");

Route.route("/").get(getPosts).post(postVS, postPost);
Route.route("/:userId").get(getSinglePost).patch(patchPost).delete(deletePost);

module.exports = Route;
