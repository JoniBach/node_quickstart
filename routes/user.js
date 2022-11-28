
//1 st step
const express = require("express");

//2nd step
const router = express.Router()

//3rd step
const profileController = require('../controllers/user')

//4th step
router.post('/register', profileController.register)
router.post('/login', profileController.login)
router.get('/isUserAuth', profileController.verifyJWT, (req, res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

//5th step
module.exports=router 