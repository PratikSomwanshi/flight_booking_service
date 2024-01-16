const router = require("express").Router();

const { BookingController } = require("../../controller");
const { BookingMiddleware } = require("../../middlewares");

router.post("/", BookingController.createBooking);

router.get("/", BookingController.getAllBooking);

router.get("/:id", BookingController.getBooking);

router.post(
    "/payments",
    BookingMiddleware.validatePayment,
    BookingController.makePayment
);

module.exports = router;
