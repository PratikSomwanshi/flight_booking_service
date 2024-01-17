const { Op } = require("sequelize");

const CrudRepository = require("./crud.repository");
const { Booking } = require("../models");
const { CREATE_BOOKING } = require("../utils/common/Enums").CREATE_BOOKING;

const { BOOKED, CANCELLED } = CREATE_BOOKING;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async cancelOldBookings() {
        const response = await Booking.update(
            {
                status: CANCELLED,
            },
            {
                where: {
                    [Op.and]: [
                        {
                            createdAt: {
                                [Op.lt]: new Date(),
                            },
                        },
                        {
                            status: {
                                [Op.ne]: BOOKED,
                            },
                        },
                        {
                            status: {
                                [Op.ne]: CANCELLED,
                            },
                        },
                    ],
                },
            }
        );
    }
}

module.exports = BookingRepository;
