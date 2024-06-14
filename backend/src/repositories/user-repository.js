const { StatusCodes } = require('http-status-codes');
const User = require('../modles/user')
// const { ClientError } = require('../utils/error');

const CrudRepository = require('./crud-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
        
    }

  

    getUserByEmail = async (userEmail) => {
        try {
            const user = await User.findOne({ email: userEmail });
            return user;
        } catch (error) {
            console.log("🚀 ~ file: user-repository.js ~ line 33 ~ UserRepository ~ getUserByEmail= ~ error", error)
            throw error;
        }
    }

    getUserById = async (userId) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch(error) {
            throw error;
        }
    }

}

module.exports = UserRepository;