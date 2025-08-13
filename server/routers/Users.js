const express = require('express')
const router = express.Router();
const {Users} = require("../models");
const bcryp = require("bcrypt")

//Need add the JWT config
router.post('/login', async (req,res)=>{
    //Need the dependice JWT
})

router.post('/registration', async(req,res)=>{
    const {firstName,lastName,email,bornDate,username,password}=req.body;
    bcryp.hash(password,10).then((hash)=>{
        Users.create({
        username:username,
        password:hash,
        email:email,
        bornDate:bornDate,
        firstName:firstName,
        lastName:lastName,
        })
    })
    res.json("User create!")
})

module.exports = router;