const {StatusCodes} = require('http-status-codes');
const { JobRepository } = require('../repositories');


class JobService {
    constructor() {
        this.jobRepository = new JobRepository();
    }

    create = async (data) => {
        try {
            const job = await this.jobRepository.create(data);
            return job;
        } catch (error) {
            throw error;
        }
    }

    getAll = async () => {
        try {
            const jobs = await this.jobRepository.getAll();
            return jobs;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = JobService;