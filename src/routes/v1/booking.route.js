const router = require("express").Router();

const { BookingController } = require("../../controller");

router.post("/", BookingController.createBooking);

router.get("/", BookingController.getAllBooking);

router.get("/:id", BookingController.getBooking);

router.put("/:id", BookingController.updateBooking);

router.delete("/:id", BookingController.deleteBooking);

module.exports = router;
