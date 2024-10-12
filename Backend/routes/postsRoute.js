const express = require("express");
const addPost = require("../controllers/Posts/addPost");
const getPosts = require("../controllers/Posts/getPosts");
const getCategories = require("../controllers/Posts/getCategories");
const addCategory = require("../controllers/Posts/addCategory");
const getHomePost = require("../controllers/Posts/getHomePosts");
const getSinglePost = require("../controllers/Posts/getSinglePost");
const deletePost = require("../controllers/Posts/deletePost");
const router = express.Router();

router.post("/addPost", addPost);
router.get("/getPosts", getPosts);
router.get("/getCategories", getCategories);
router.post("/addCategory", addCategory);
router.get("/getHomePost", getHomePost);
router.delete("/deletePost", deletePost);
router.get("/getSinglePost/:id", getSinglePost);

module.exports = router;
