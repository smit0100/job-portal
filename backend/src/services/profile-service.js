const { StatusCodes } = require('http-status-codes');

const { ProfileRepository } = require('../repositories');
const { ClientError } = require('../utils/error/client-error');

class ProfileService {
    constructor() {
        this.profileRepository = new ProfileRepository();
    }

    create = async (data) => {
        try {
            const profile = await this.profileRepository.create(data);
            return profile;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProfileService;