const express = require('express')
const router = express.Router();
const {registerUsers} = require('../controllers/registration.controller')

//Need add the JWT config
router.post('/login', async (req,res)=>{
    //Need the dependice JWT
})


router.post('/registration',registerUsers)

module.exports = router;