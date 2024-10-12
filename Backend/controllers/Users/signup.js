const { default: mongoose } = require("mongoose");

const URL = require("../../config");
const UserModel = require("../../model/UserModel");

const bcrypt = require("bcryptjs");

mongoose.connect(URL);
async function signup(req, res) {
  const payload = req.body;

  const existinguser = await UserModel.findOne({ email: payload.email });

  if (existinguser) {
    return res.json({
      success: false,
      message: "User already exists with same email",
    });
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const data = new UserModel({ ...payload, password: hashedPassword });

  const result = await data.save();
  return res.json({
    success: true,
    result,
    message: "You're signed up successfully",
  });
}

module.exports = signup;
