const jwt = require("jsonwebtoken");
const config = require('../config/env')
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: " token" });
  }
}

module.exports = authMiddleware
