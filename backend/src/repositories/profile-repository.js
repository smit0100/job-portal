const CrudRepository = require('./crud-repository');
// const User = require('../modles/user')
const Profile = require('../modles/profile')

class ProfileRepository extends CrudRepository {
    constructor() {
        super(Profile)
    }
}

module.exports = ProfileRepository;