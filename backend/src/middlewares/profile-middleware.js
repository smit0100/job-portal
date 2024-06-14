const { StatusCodes } = require('http-status-codes');

const { internalServerErrorResponse } = require('../utils/common/response-object');

const validateProfileCreateRequest = (req, res, next) => {
    console.log("🚀 ~ file: profile-middleware.js ~ line 8 ~ validateProfileCreateRequest ~ req.body",req.body)
    const { userId, bio, skills, experience, education, resume } = req.body;

    if (!userId) {

        return res.status(StatusCodes.BAD_REQUEST).json(internalServerErrorResponse('User ID is required'));
    }

    if (experience) {
        for (let exp of experience) {
            if (!exp.company || !exp.position || !exp.startDate || !exp.endDate || !exp.description) {
                return res.status(400).json({ error: 'All experience fields are required' });
            }
        }
    }

    if (education) {
        for (let edu of education) {
            if (!edu.college || !edu.degree || !edu.fieldOfStudy || !edu.startDate || !edu.endDate) {
                return res.status(400).json({ error: 'All education fields are required' });
            }
        }
    }

    next();
};


module.exports = {
    validateProfileCreateRequest
}