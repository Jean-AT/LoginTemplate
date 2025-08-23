const express = require('express')
const router = express.Router();
const { login,ChangeData,registration,deleteAcount,dashBoard,getAllUsers } = require('../controllers/Users');
const {authenticationMiddleware,verifyAdmin} = require('../middleware/auth')

router.post('/login',login)

router.post('/registration',registration)

router.delete('/deleteAcount',authenticationMiddleware,deleteAcount)

router.put('/ChangeData',authenticationMiddleware,ChangeData)

router.get('/dashBoard',authenticationMiddleware,dashBoard)

router.get('/getAllUsers',authenticationMiddleware,verifyAdmin,getAllUsers)

module.exports = router;