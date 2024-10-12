const JWT = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  JWT.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token has expired" });
      }
      res.json({ success: false, message: "Unauthorized" });
    }
    req.userId = decoded._id;
    next();
  });
}

module.exports = verifyToken;
