const express = require("express")
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/',auth,async (req,res)=>{
     res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});

     res.status(200).json({message: "Logout successful"})
})

module.exports = router