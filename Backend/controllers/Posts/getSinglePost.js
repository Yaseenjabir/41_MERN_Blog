const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);
async function getSinglePost(req, res) {
  const { id } = req.params;

  const result = await PostModel.findById({ _id: id });

  res.json({ success: true, result });
}

module.exports = getSinglePost;
