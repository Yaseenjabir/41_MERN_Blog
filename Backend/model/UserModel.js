const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.models.users || mongoose.model("users", Schema);

module.exports = UserModel;
