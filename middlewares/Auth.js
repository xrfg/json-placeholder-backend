const jwt = require("jsonwebtoken");

// whichever route u want to protect, i need token inside of header

exports.auth = (req, res, next) => {
  const token = req.header("x-auth");
  const decodedToken = jwt.verify(token, "secretkeyfromxerox");
  if (decodedToken) {
    next();
  } else {
    next(new Error("unauthorized user"));
  }
};
