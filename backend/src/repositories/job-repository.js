const Job = require('../modles/job');
const curudRepository = require('./crud-repository');

class JobRepository extends curudRepository {
    constructor() {
        super(Job);
    }
}

module.exports = JobRepository;