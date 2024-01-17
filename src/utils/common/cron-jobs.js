const corn = require("node-cron");

const { BookingService } = require("../../services");

function scheduleCorn() {
    corn.schedule("*/20 * * * *", async function () {
        await BookingService.cancelOldBookings();
        console.log("Successfully Cancelled Old Bookings");
    });
}

module.exports = scheduleCorn;
