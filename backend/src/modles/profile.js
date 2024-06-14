const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio: String,
    skills: [String],
    experience: [
        {
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
            description: String,
        }
    ],
    education: [
        {
            college: String,
            degree: String,
            fieldOfStudy: String,
            startDate: Date,
            endDate: Date,
        }
    ],
    resumeURL: String
})






const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;