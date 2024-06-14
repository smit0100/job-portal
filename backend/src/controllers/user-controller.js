
const { StatusCodes } = require('http-status-codes');


const { UserService } = require('../services/index');

const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-object');

class UserContoller  {
    constructor() {
        this.UserService = new UserService();
    }

    signup = async (req, res) => {
        try {
           
            const user = await this.UserService.signup({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                
            });

            
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created user',
                err: {},
                data: user,
                sccuess: true
            });
        } catch (error) {
            console.log("Error in user controller", error)
            if(!error.statusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(customErrorResponse(error.message));
        }
    }

    signin = async (req, res) => {
        try {
            console.log("🚀 ~ file: user-controller.js ~ line 56 ~ UserContoller ~ signin= ~ req", req.body)
            const response = await this.UserService.signin({
                email: req.body.email,
                password: req.body.password
            });
            console.log("🚀 ~ file: user-controller.js ~ line 59 ~ UserContoller ~ signin= ~ response", response)

            res.cookie('token', response.jwtToken.accessToken)
            res.cookie('refresh', response.jwtToken.refreshToken)

            response.jwtToken = undefined;
            return res.status(StatusCodes.OK).json({
                messagee: 'Successfully signed in',
                err: {},
                data: response,
                success: true
            });
        } catch (error) {
            console.log("Error in user controller", error)
            if (!error.statusCode) {
                return internalServerErrorResponse(res, error.message);
            }

            return res.status(error.statusCode).json(customErrorResponse(error.message));
        }
    }
}



module.exports = new UserContoller();
