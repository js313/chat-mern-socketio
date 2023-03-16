const CustomError = require("../CustomError/CustomError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    let token = req.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      const cookieToken = req.cookies.token;
      if (!cookieToken) {
        throw new CustomError({
          message: "authorization token missing",
          code: 401,
        });
      }
      token = cookieToken;
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload && payload.id) {
      const user = User.findById(payload.id);
      if (!user) {
        throw new CustomError({
          message: "email and password combination incorrect",
          code: 401,
        });
      }
    } else {
      throw new CustomError({
        message: "email and password combination incorrect",
        code: 401,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
