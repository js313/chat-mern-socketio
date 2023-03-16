const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CustomError = require("../CustomError/CustomError");

function signJwt(res, user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    maxAge: 3600000,
    httpOnly: true,
    // secure: true,  //DEV
  });
  res.set("Authorization", `Bearer ${token}`);
}

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //TODO: validate email, password, name
    const user = new User({ name, email, password });
    signJwt(res, user);
    await user.save();
    res
      .status(201)
      .json({
        data: { id: user._id, name: user.name, email: user.email },
        message: "user created",
      });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      signJwt(res, user);
      res.status(201).json({
        data: { id: user._id, name: user.name, email: user.email },
        message: "user created",
      });
    } else {
      throw new CustomError({
        message: "invalid email or password",
        code: 400,
      });
    }
  } catch (err) {
    next(err);
  }
};
