const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  username: String,
  user_id: String,
  post_id: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  comment: String,
});

const CommentModel = mongoose.model("comments", Schema);

module.exports = CommentModel;
