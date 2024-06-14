const mongoose = require('mongoose');

const JobRecomndationSchema = mongoose.Schema({
    userId: {
        type: mongoose.types.ObjectId,
        required: true,
        ref: 'User'
    },
    jobId: {
        type: mongoose.types.ObjectId,
        required: true,
        ref: 'Job'
    },
    recommendedDate: {
        type: Date,
        default:Date.now
    },
    aiModelUsed: {
        String
    }
})


const JobRecomndation = mongoose.model('JobRecomndation', JobRecomndationSchema);
module.exports = JobRecomndation;