const express = require("express");
const addComment = require("../controllers/Comments/addComment");
const getComments = require("../controllers/Comments/getComments");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();

router.post("/addComment", addComment);
router.get("/getComments/:id", getComments);

module.exports = router;
