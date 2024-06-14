const { StatusCodes } = require('http-status-codes');


const { internalServerErrorResponse } = require('../utils/common/response-object');

const validateJobCreateRequest = (req, res, next) => {
    const { title, company } = req.body;

    if (!title || !company) {
        return res.status(StatusCodes.BAD_REQUEST).
            json({
            error: 'The fields "title" and "company" are required.'
        });
    }

    next();
};

const checkParamsForId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.StatusCodes.BAD_REQUEST.json({
            error: 'The field "id" is required.'
        });
    }

    next();
};

module.exports = {
    validateJobCreateRequest,
    checkParamsForId
}