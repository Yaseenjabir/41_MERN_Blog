const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);
async function getPosts(_, res) {
  const result = await PostModel.find({});

  if (result.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No data available" });
  }

  return res.json({ success: true, result });
}

module.exports = getPosts;
