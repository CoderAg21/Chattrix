const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ msg: "Please enter the credentials." });
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({message:"Something went wrong"});

    const flag = await bcrypt.compare(password, user.get("password"));
    if (flag) {
      const obj = {
        email,
        userId: user.get("_id"),
        name:user.get('name')
      };
      const token = jwt.sign(obj, config.JWT_TOKEN);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 86400000,
      });

      return res.status(200).json({ msg: "Login Successfully."});
    } else {
      return res.status(404).json({ message: "Something went wrong." });
    }
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
