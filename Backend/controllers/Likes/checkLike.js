const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const LikesModel = require("../../model/LikesModel");

mongoose.connect(URL);

async function checkLike(req, res) {
  const post_id = req.params.id;

  const user_id = req.userId;

  const filter = {
    user_id,
    post_id,
  };

  const result = await LikesModel.findOne(filter);

  if (!result) {
    return res.json({ liked: false });
  }

  return res.json({ liked: true });
}

module.exports = checkLike;
