const router = require('express').Router();
const userRoutes = require('./user-routes');
const profileRoutes = require('./profile-routes');
const jobRoutes = require('./job-routes');

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/job', jobRoutes);


module.exports = router;