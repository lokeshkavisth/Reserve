const { Booking } = require("../models/models");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    if (!booking) {
      return res
        .status(422)
        .json({ success: false, message: "Failed to create booking" });
    }
    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking", error);

    // Handle specific validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }

    // General server error
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = createBooking;
