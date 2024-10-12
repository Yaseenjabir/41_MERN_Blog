const mongoose = require("mongoose");
const URL = require("../../config");
const UserModel = require("../../model/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

async function login(req, res) {
  const { email, password } = req.body;

  await mongoose.connect(URL);

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No user found with this email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid password" });
  }

  const token = JWT.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "7d" });

  return res.status(200).json({
    success: true,
    token,
  });
}

module.exports = login;
