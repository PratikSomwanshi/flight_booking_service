const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const db = require("../models");
const { CREATE_BOOKING } = require("../utils/common/Enums").CREATE_BOOKING;

const { BOOKED, CANCELLED } = CREATE_BOOKING;

const { BookingRepository } = require("../repository");
const AppError = require("../utils/error/AppError");
const { ServerConfig } = require("../config");

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

async function makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetail = await bookingRepository.get(data.bookingId);

        if (!bookingDetail) {
            throw new AppError("booking not found", StatusCodes.BAD_REQUEST);
        }

        const bookingTime = new Date(bookingDetail.createdAt);
        const timeNow = new Date();

        if (bookingDetail.totalCost != data.price) {
            throw new AppError(
                "The price does not match the total cost of this booking",
                StatusCodes.BAD_REQUEST
            );
        }

        if (bookingDetail.status == BOOKED) {
            throw new AppError(
                "Flight Already Booked",
                StatusCodes.BAD_REQUEST
            );
        }

        if (bookingDetail.status == CANCELLED) {
            throw new AppError(
                "Flight Already Cancelled",
                StatusCodes.BAD_REQUEST
            );
        }

        if (timeNow - bookingTime > 300000) {
            cancelBooking(data.bookingId);
            throw new AppError("Time Period is OVer", StatusCodes.BAD_REQUEST);
        }

        const response = await bookingRepository.update(
            data.bookingId,
            {
                status: BOOKED,
            },
            transaction
        );

        await transaction.commit();
        return response;
    } catch (error) {
        await transaction.rollback();

        if (error instanceof AppError) throw error;

        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function cancelBooking(id) {
    const transaction = await db.sequelize.transaction();
    try {
        const booking = await bookingRepository.update(
            id,
            { status: CANCELLED },
            transaction
        );

        // console.log(booking.flightId);

        await axios.patch(
            `http://${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/seats/${booking.flightId}`,
            {
                seats: booking.noOfSeats,
                dec: 0,
            }
        );

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw new AppError(error, StatusCodes.BAD_REQUEST);
    }
}

async function cancelOldBookings() {
    const dateNow = new Date(Date.now() - 1000 * 300);
    try {
        await bookingRepository.cancelOldBookings(dateNow);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBooking,
    makePayment,
    cancelBooking,
    cancelOldBookings,
};
