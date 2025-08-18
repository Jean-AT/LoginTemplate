const express = require('express')
const router = express.Router();
const {Users} = require("../models");
const bcryp = require("bcrypt")
const {sign} = require('jsonwebtoken');
const { where } = require('sequelize');

router.post('/login', async (req,res)=>{
    const {username,password}= req.body;
    const user = await Users.findOne({where:{username:username}})
    if(!user){res.json({error:"User don't exist"})};
    bcryp.compare(password,user.password).then((match)=>{
        if(!match) res.json({error:"Not match betwen the password and username"})
        const accesToken = sign(
            {username:user.username,id:user.id},
            "SecretJsonToken"
        )
        res.json(accesToken);
    })
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

router.delete('/deleteAcount/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const deleted = await Users.destroy({where: {id : id}})
        if (deleted) {
        return res.json({ message: `Usuario con id ${id} eliminado` });
    }
    }catch (err) {
    return res.status(500).json({ error: err.message });
    }
})

router.put('/ChangeData/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const {username,password,email} = req.body;
        const user = await Users.findOne({where :{id:id}})
        if(user){
            user.username = username
            user.email = email
            user.password = password
            await user.save();
            res.json("Usuario Guardado")
        }
    }catch(err){ 
        return res.status(500).json({error:err.message});
    }
})

//Routers with Token Acces
router.get('/:id/Dashboard',async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await Users.findOne({where:{id:id}})
        if(user.rol == "Admin"){
            //The user cant enter the dashboard page
        }
    }catch{}
})

module.exports = router;