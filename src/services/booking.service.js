const { StatusCodes } = require("http-status-codes");

const { BookingRepository } = require("../repository");
const AppError = require("../utils/error/AppError");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    try {
        const response = await bookingRepository.create(data);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function getBooking(id) {
    try {
        const response = await bookingRepository.get(id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function getAllBooking() {
    try {
        const response = await bookingRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function updateBooking(data, id) {
    try {
        const response = await bookingRepository.update(data, id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

async function deleteBooking(id) {
    try {
        const response = await bookingRepository.delete(id);
        return response;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBooking,
    updateBooking,
    deleteBooking,
};
