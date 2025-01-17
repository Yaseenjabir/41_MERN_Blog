const express = require("express");
const signup = require("../controllers/Users/signup");
const login = require("../controllers/Users/login");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
