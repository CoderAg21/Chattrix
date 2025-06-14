const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
router.post('/',(req,res)=>{
const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token,'1001');
    return res.status(200).json({token:decoded, message: "Authenticated successfully"});
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
})
module.exports = router