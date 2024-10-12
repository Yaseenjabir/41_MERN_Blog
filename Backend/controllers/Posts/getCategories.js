const { default: mongoose } = require("mongoose");
const URL = require("../../config");
const categoryModel = require("../../model/CategoryModel");

mongoose.connect(URL);
async function getCategories(_, res) {
  const result = await categoryModel.find().select("-_id category");

  if (result.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No categories found" });
  }

  return res.status(200).json({ success: true, result });
}

module.exports = getCategories;
