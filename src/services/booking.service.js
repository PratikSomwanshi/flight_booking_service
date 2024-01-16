const { StatusCodes } = require("http-status-codes");

const axios = require("axios");

const { BookingRepository } = require("../repository");
const AppError = require("../utils/error/AppError");
const { ServerConfig } = require("../config");
const db = require("../models");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(
            `http://${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
        );

        const flightData = flight.data.data;

        if (!flightData) {
            throw new AppError("No Flight Available", StatusCodes.BAD_REQUEST);
        }

        const totalCost = flightData.price * data.noOfSeats;

        const response = await bookingRepository.create(
            { ...data, totalCost },
            transaction
        );

        await axios.patch(
            `http://${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/seats/${data.flightId}`,
            {
                seats: data.noOfSeats,
                dec: 1,
            }
        );

        await transaction.commit();
        return response;
    } catch (error) {
        // console.log(error);
        await transaction.rollback();

        throw new AppError(error, StatusCodes.BAD_REQUEST);
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
