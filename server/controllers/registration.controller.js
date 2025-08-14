const { Users } = require('../models')
const { hashPassword } = require('../utils/hashPassword')


const registerUsers = async(req,res)=>{
    console.log("📩 Request recibida en /registration:", req.body);
    try{
        const {firstName,lastName,email,bornDate,username,password}=req.body;
        const hash = await hashPassword(password)

        await Users.create({
            username:username,
            password:hash,
            email:email,
            bornDate:bornDate,
            firstName:firstName,
            lastName:lastName,
        })
        res.json("User create!")
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error creating user"})
    }
}



module.exports = {registerUsers}