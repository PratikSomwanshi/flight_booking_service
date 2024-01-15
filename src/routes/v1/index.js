const router = require("express").Router();

const bookingRoute = require("./booking.route");

router.use("/bookings", bookingRoute);

module.exports = router;
