const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const LikesModel = require("../../model/LikesModel");
const PostModel = require("../../model/PostModel");

mongoose.connect(URL);

async function handleLikes(req, res) {
  const userId = req.userId;
  const { postId } = req.body;

  const checkLike = await LikesModel.findOne({
    user_id: userId,
    post_id: postId,
  });

  if (checkLike) {
    await LikesModel.findOneAndDelete({ user_id: userId, post_id: postId });
    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: -1 } },
      { new: true }
    );
    return res.json({ liked: false });
  }

  const likeData = new LikesModel({
    user_id: userId,
    post_id: postId,
  });

  await likeData.save();

  await PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { likes: 1 } },
    { new: true }
  );

  return res.json({ liked: true });
}

module.exports = handleLikes;
