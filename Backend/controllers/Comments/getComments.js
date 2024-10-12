const CommentModel = require("../../model/CommentModel");

async function getComments(req, res) {
  const _id = req.params.id;

  const result = await CommentModel.find({ post_id: _id });

  if (result.length === 0) {
    return res.json({ success: false, message: "no comments available" });
  }

  return res.json({ success: true, result });
}

module.exports = getComments;
