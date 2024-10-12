const PostModel = require("../../model/PostModel");

async function searchPost(req, res) {
  const { query } = req.query;

  const regex = new RegExp(query, "i");

  if (query.length === 0) {
    return res.json([]);
  }
  const result = await PostModel.find({ title: regex });

  res.json(result);
}

module.exports = searchPost;
