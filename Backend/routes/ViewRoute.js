const express = require("express");
const viewPost = require("../controllers/Views/viewPost");
const router = express.Router();

router.post("/viewPost", viewPost);

module.exports = router;
