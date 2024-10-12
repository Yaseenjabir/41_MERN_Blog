const express = require("express");
const searchPost = require("../controllers/Search/searchPost");
const router = express.Router();

router.post("/searchPost", searchPost);

module.exports = router;
