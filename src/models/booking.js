"use strict";
const { Model } = require("sequelize");
const { CREATE_BOOKING } = require("../utils/common/Enums").CREATE_BOOKING;

const { BOOKED, INITIATED, CANCELLED, PENDING } = CREATE_BOOKING;

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init(
        {
            flightId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.ENUM,
                values: [BOOKED, INITIATED, CANCELLED, PENDING],
                defaultValue: INITIATED,
                allowNull: false,
            },
            noOfSeats: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalCost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Booking",
        }
    );
    return Booking;
};
