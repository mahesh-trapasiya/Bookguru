require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    let token;
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const err = new Error("Unauthorized Access");
      return next(err);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    /* Checking User Existence */
    /* Checking User Existence */

    req.auth = {
      _id: decodedToken._id,
      role: decodedToken.role,
      isAuthorized: true,
    };
    User.findById({ _id: req.auth._id });
    next();
  } catch (error) {
    console.log("unauthorized__");
    req.isAuthorized = false;
    return next(new Error("Unauthorzed Access"));
  }
};
