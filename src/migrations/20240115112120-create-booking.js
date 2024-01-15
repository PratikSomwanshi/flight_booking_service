"use strict";

const { CREATE_BOOKING } = require("../utils/common/Enums").CREATE_BOOKING;

const { BOOKED, INITIATED, CANCELLED, PENDING } = CREATE_BOOKING;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            flightId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.ENUM,
                values: [BOOKED, INITIATED, CANCELLED, PENDING],
                defaultValue: INITIATED,
                allowNull: false,
            },
            noOfSeats: {
                type: Sequelize.INTEGER,
            },
            totalCost: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Bookings");
    },
};
