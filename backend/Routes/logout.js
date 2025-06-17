const express = require("express")
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/',auth,async (req,res)=>{
    await res.clearCookie('token')
    res.status(200).json({message: "Logout successful"})
})

module.exports = router