const { default: mongoose } = require("mongoose");

const URL = require("../../config");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);

async function viewPost(req, res) {
  const { _id } = req.body;

  const result = await PostModel.findOneAndUpdate(
    { _id },
    { $inc: { views: 1 } },
    { new: true }
  );

  res.send(result);
}

module.exports = viewPost;
