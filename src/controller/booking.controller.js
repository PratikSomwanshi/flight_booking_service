const { Logger } = require("../config");
const { BookingService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const Strings = require("../utils/strings/booking.string");

async function createBooking(req, res) {
    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            noOfSeats: req.body.noOfSeats,
        });
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        // console.log(error);

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getBooking(req, res) {
    try {
        const response = await BookingService.getBooking(req.params.id);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllBooking(req, res) {
    try {
        const response = await BookingService.getAllBooking(req.body.id);
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function makePayment(req, res) {
    try {
        const response = await BookingService.makePayment({
            bookingId: req.body.bookingId,
            price: req.body.price,
        });
        Logger.info(Strings.CRATED);

        SuccessResponse.message = Strings.CRATED;
        SuccessResponse.data = response;

        return res.json(SuccessResponse);
    } catch (error) {
        Logger.error(`${Strings.FAILED_CREATE} : ${error.message}`);

        ErrorResponse.error = error;
        console.log(error);

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBooking,
    makePayment,
};
