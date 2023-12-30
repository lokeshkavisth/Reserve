const { Booking } = require("../../models/models");

const fetchBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const { uid: userID } = req.query;

    const bookings = await Booking.find({ uid: userID })
      .skip(skip)
      .limit(limit);

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No bookings found!" });
    }

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
module.exports = fetchBookings;
