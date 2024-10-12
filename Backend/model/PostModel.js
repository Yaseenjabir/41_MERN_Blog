const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("posts", Schema);

module.exports = PostModel;
