const express = require('express')
const router = express.Router();
const {Users} = require("../models");
const bcryp = require("bcrypt")

router.post('/', async (req,res)=>{
    const {username,password} = req.body;
    bcryp.hash(password,10).then((hash)=>{
        Users.create({
            username:username,
            password:password,
        })
        res.json("It's work")
    })
})

module.exports = router;