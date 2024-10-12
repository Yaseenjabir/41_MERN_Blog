const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  post_id: mongoose.Schema.Types.ObjectId,
});

const LikesModel = mongoose.models.likes || mongoose.model("likes", Schema);

module.exports = LikesModel;
