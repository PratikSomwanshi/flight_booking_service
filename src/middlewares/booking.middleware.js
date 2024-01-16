const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");

function validatePayment(req, res, next) {
    const { price, bookingId } = req.body;

    if (!bookingId) {
        ErrorResponse.error = {
            statusCode: StatusCodes.NOT_FOUND,
            message: "Booking ID is required",
        };

        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    if (!price) {
        ErrorResponse.error = {
            statusCode: StatusCodes.NOT_FOUND,
            message: "Price is required",
        };

        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validatePayment,
};
