const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);
async function addPost(req, res) {
  const payload = req.body;

  const data = new PostModel(payload);

  const result = await data.save();

  res.json({ success: true, result });
}

module.exports = addPost;
