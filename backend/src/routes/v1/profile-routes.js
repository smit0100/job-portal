const parser = require('../../config/cloudinaryConfig');

const { ProfileMiddleWares } = require('../../middlewares');
const createParser = require('../../config/cloudinaryConfig');
const Profile = require('../../modles/profile');
const { ProfileController } = require('../../controllers')




const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('hello from ')
})


router.post('/create',
    parser.single('image'),
    ProfileMiddleWares.validateProfileCreateRequest, 
    ProfileController.create
)


module.exports = router;