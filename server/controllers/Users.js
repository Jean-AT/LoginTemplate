const {Users} = require("../models");
const {sign} = require('jsonwebtoken');
const bcryp = require("bcrypt")


const login = async(req,res)=>{
    try{
        const {username,password}= req.body;
        const user = await Users.findOne({where:{username:username}})
        if(!user){ res.json({error:"User don't exist"})};
        bcryp.compare(password,user.password).then((match)=>{
            if(!match) {return res.status(400).json({error:"Not match betwen the password and username"})}
            const accesToken = sign(
                {username:user.username,id:user.id},
                process.env.JWT_SECRET,{
                    expiresIn:'1d'
                }
            )
            return res.json(accesToken);
        })
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

const registration = async(req,res)=>{
    try{
        const {firstName,lastName,email,bornDate,username,password,rol}=req.body;
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
        const id = req.params.id;
        const deleted = await Users.destroy({where: {id : id}})
        if (deleted) {
        return res.json({ message: `Usuario con id ${id} eliminado` });
    }
    }catch (err) {
    return res.status(500).json({ error: err.message });
    }
}

const ChangeData = async(req,res)=>{
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
}

const dashBoard = async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await Users.findOne({where:{id:id}})
        if(user.rol == "Admin"){
            //The user cant enter the dashboard page
            res.json("Eres admin")
        }else{
            res.status(800).json({error:"NO ES ADMIn"})
        }
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