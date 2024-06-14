const express = require('express');

const { JobController } = require('../../controllers');
const { JobMiddleWares } = require('../../middlewares');

const router = express.Router();


router.post('/create',
    JobMiddleWares.validateJobCreateRequest,
    JobController.create
);
router.get('/:id',
    JobController.getJob
);



module.exports = router;
