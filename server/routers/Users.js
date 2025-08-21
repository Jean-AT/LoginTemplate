const express = require('express')
const router = express.Router();
const { login,ChangeData,registration,deleteAcount,dashBoard,getAllUsers } = require('../controllers/Users');
const authMiddleware = require('../middleware/auth')

router.post('/login',login)//sirve

router.post('/registration',registration)//sirve

router.delete('/deleteAcount/:id',deleteAcount)//sirve

router.put('/ChangeData/:id',ChangeData)//sirve

router.get('/dashBoard',authMiddleware,dashBoard)//Test the middleware

router.get('/getAllUsers',getAllUsers)//sirve

module.exports = router;