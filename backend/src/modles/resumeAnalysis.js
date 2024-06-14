const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeAnalysisSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: String,
    analysisDate: { type: Date, default: Date.now },
    suggestions: {
        strengths: [String],
        areasForImprovement: {
            introduction: [String],
            education: [String],
            technicalSkills: [String],
            projects: [String],
            achievements: [String],
            formatting: [String],
            tailoring: [String]
        }
    },
    aiModelUsed: String,
});

const ResumeAnalysis = mongoose.model('ResumeAnalysis', ResumeAnalysisSchema);
module.exports = ResumeAnalysis;