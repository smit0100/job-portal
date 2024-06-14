const router = require('express').Router();
const parser = require('../../config/cloudinaryConfig');

const {UserController} = require('../../controllers')

const { AuthMiddleWares } = require('../../middlewares');



router.get('/', (req, res) => {
    res.send('hello')
})

router.post('/signup',
    AuthMiddleWares.validateSignupRequest,
    UserController.signup
    
)

router.post('/signin',
    AuthMiddleWares.validateSinginRequest,
    UserController.signin
    
)










module.exports = router;