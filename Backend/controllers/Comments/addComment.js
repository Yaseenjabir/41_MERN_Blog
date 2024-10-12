const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const UserModel = require("../../model/UserModel");
const CommentModel = require("../../model/CommentModel");

mongoose.connect(URL);

async function addComment(req, res) {
  const user_id = req.userId;
  const { post_id, comment } = req.body;

  const user = await UserModel.findById({ _id: user_id });

  const commentData = new CommentModel({
    username: user.name,
    user_id,
    post_id,
    comment,
  });

  const result = await commentData.save();

  res.send({ result });
}

module.exports = addComment;
