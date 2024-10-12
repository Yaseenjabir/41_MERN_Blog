const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);
async function getHomePost(_, res) {
  const result = await PostModel.find().limit(3).exec();

  res.json({ success: true, result });
}

module.exports = getHomePost;
