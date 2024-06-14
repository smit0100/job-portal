const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories');
// const { ClientError } = require('../utils/error');
const {ClientError} = require('../utils/error/client-error');
const ValidationError = require('../utils/error/validation-error');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signup = async (data) => {
        try {
           console.log("🚀 ~ file: user-service.js ~ line 47 ~ UserService ~ signup= ~ data", data)
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {

            if (error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message,
                });
            }
            throw error;
        }
    }
    
    signin = async (data) => {
        try {
            console.log("🚀 ~ file: user-service.js ~ line 63 ~ UserService ~ signin= ~ data", data)
            const user = await this.userRepository.getUserByEmail(data.email);
            if (!user) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No Registration found with this email',
                }, StatusCodes.NOT_FOUND);
            }

            const passwordMatch = user.comparePassword(data.password)

            if (!passwordMatch) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'Password does not match',
                })
            }

            const jwtToken = user.generateJWT();
            console.log("🚀 ~ file: user-service.js ~ line 81 ~ UserService ~ signin= ~ jwtToken", jwtToken)
            

            return {
                username: user.email,
                jwtToken
            }
        } catch (error) {
            conosle.log("🚀 ~ file: user-service.js ~ line 85 ~ UserService ~ signin= ~ error", error)
            throw error;
        }
    }

    
}

module.exports = UserService;