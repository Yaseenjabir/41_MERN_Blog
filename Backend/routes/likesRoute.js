const express = require("express");
const handleLikes = require("../controllers/Likes/handleLike");
const checkLike = require("../controllers/Likes/checkLike");
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

router.post("/handleLikes", handleLikes);
router.get("/checkLike/:id", checkLike);

module.exports = router;
