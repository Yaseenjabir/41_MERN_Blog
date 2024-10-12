const { default: mongoose } = require("mongoose");

const URL = require("../../config");
const categoryModel = require("../../model/CategoryModel");

mongoose.connect(URL);
async function addCategory(req, res) {
  const payload = req.body;

  const data = new categoryModel(payload);

  const result = await data.save();

  return res.status(200).json({ success: true, result });
}

module.exports = addCategory;
