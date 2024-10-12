const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);
async function deletePost(req, res) {
  const { _id } = req.body;

  console.log(_id);

  const result = await PostModel.findOneAndDelete({ _id });

  res.json({ success: true, result });
}

module.exports = deletePost;
