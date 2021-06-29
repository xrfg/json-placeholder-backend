const UserModal = require("../modals/userSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postUser = async (req, res, next) => {
  try {
    const user = new UserModal(req.body);
    await user.save();
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const user = await UserModal.findOne({ email: req.body.email });
  if (!user) {
    next(new createError.NotFound("no such user found in DB"));
  } else {
    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check) {
      next(new createError.NotFound("password doesnt match"));
    } else {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        "secretkeyfromxerox"
      );
      res.header("x-auth", token);
      res.send({ success: true, data: user });
    }
  }
};
