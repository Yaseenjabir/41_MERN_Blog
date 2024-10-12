const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  category: String,
});

const categoryModel = mongoose.model("categories", Schema);

module.exports = categoryModel;
