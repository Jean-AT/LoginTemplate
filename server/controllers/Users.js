const {Users} = require("../models");
const {sign} = require('jsonwebtoken');
const bcryp = require("bcrypt");
const {Op} = require("sequelize")


const login = async(req,res)=>{
    try{
        const {username,password}= req.body;
        const user = await Users.findOne({where:{username:username}})
        if(!user){ res.json({error:"User don't exist"})};
        bcryp.compare(password,user.password).then((match)=>{
            if(!match) {return res.status(400).json({error:"Not match betwen the password and username"})}
            const accesToken = sign(
                {id:user.id,username:user.username,rol:user.rol},
                process.env.JWT_SECRET,{
                    expiresIn:'10h'
                }
            )
            res.cookie("token", accesToken, {
            httpOnly: true,      // no accesible desde JS
            sameSite: "strict",  // protege contra CSRF
            maxAge: 24 * 60 * 60 * 1000 // expira en 1 día
            });
            res.json({ message: "Login exitoso" });

        })
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

const registration = async(req,res)=>{
    try{
        const {firstName,lastName,email,bornDate,username,password,rol}=req.body;
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [
                { username },
                { email }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        bcryp.hash(password,10).then((hash)=>{
            Users.create({
                username:username,
                password:hash,
                email:email,
                bornDate:bornDate,
                firstName:firstName,
                lastName:lastName,
                rol:rol,
            })
        })
        res.json("User create!")
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

const deleteAcount = async(req,res)=>{
    try{
        const id = req.user.id;
        const deleted = await Users.destroy({where: {id : id}})
        if (deleted) {
            res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false, // en prod: true
            });
            return res.json({ message: `Usuario con id ${id} eliminado` });
    }
    }catch (err) {
    return res.status(500).json({ error: err.message });
    }
}

const ChangeData = async(req,res)=>{
    try{
        const id = req.user.id;
        const {username,password,email} = req.body;
        const user = await Users.findOne({where :{id:id}})
        if(user){
            await bcryp.hash(password,10).then((hash)=>{
                user.username = username,
                user.email = email,
                user.password = hash,
                user.save()   
            });
            res.json("Usuario Guardado")
        }
    }catch(err){ 
        return res.status(500).json({error:err.message});
    }
}

const dashBoard = async(req,res)=>{
    try{
        const luckyNumber = Math.floor(Math.random() * 100);

        res.status(200).json({
            msg: `Hello, ${req.user.username}`,
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
        });
    }catch{}
}

const getAllUsers = async(req,res)=>{
    
    let users = await Users.findAll({});
    return res.status(200).json({ users });
}

module.exports = {
  login,
  registration,
  dashBoard,
  deleteAcount,
  ChangeData,
  getAllUsers,
};