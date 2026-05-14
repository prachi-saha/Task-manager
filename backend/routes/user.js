const express = require("express")
const bcrypt = require("bcrypt")
const checkPasswordStrength = require("../utils/passwordChecker")

const router = express.Router()

router.post("/analyze", async (req,res)=>{
console.log(req.body)
    const {password} = req.body

    const result = checkPasswordStrength(password)

    const hash = await bcrypt.hash(password,10)

    res.json({
        strength: result.strength,
        suggestion: result.suggestion,
        hash: hash
    })
})

module.exports = router