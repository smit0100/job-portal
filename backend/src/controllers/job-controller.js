const { StatusCodes } = require('http-status-codes');
const { JobRepository } = require('../repositories');


class JobController {
    constructor() {
        this.jobRepository = new JobRepository();
    }

    create = async (req, res) => {
        try {
            const job = await this.jobRepository.create(req.body);
            return res.status(StatusCodes.CREATED).json(job);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error);
        }
    }

    getJob = async (req, res) => {
        try {
            const { id } = req.params;
            console.log("🚀 ~ file: job-controller.js ~ line 39 ~ JobController ~ getJob= ~ id", id);
            const job = await this.jobRepository.get(id);

            if(!job){
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: 'Job not found'
                });
            }
            
            return res.status(StatusCodes.OK).json(job);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error);
        }
    }
}

module.exports = new JobController();