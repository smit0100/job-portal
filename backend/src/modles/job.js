const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    description: String,
    
    location: String,
    postedDate: Date,
    applyLink: String
})


const Job = mongoose.model('Job', JobSchema);
module.exports = Job