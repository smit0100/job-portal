const { StatusCodes } = require('http-status-codes');
const { ProfileService } = require('../services/index');

const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-object');
const User = require('../modles/user');


class ProfileController {
    constructor() {
        this.ProfileService = new ProfileService();
    }

    create = async (req, res) => {
        try {
            console.log("🚀 ~ file: profile-controller.js ~ line 41 ~ ProfileController ~ create= ~ req.body", req.body.experience)
            const profile = await this.ProfileService.create({
                userId: req.body.userId,
                bio: req.body.bio,
                skills: req.body.skills,
                experience: req.body?.experience,
                education: req.body?.education,
                resumeURL: req.file.path
            
            });

            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created profile',
                err: {},
                data: profile,
                sccuess: true
            });
        } catch (error) {
            console.log("Error in profile controller", error)
            if (!error.statusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(customErrorResponse(error.message));
        }
    }
}

module.exports = new ProfileController();