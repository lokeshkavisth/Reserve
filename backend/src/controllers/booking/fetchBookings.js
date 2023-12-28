const { Booking } = require("../../models/models");

const fetchBookings = async (req, res) => {
  try {
    //   const page = parseInt(req.query.page) || 1;
    //   const limit = 20;
    //   const skip = (page - 1) * limit;

    const bookings = await Booking.find({ uid: req.body.uid });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No bookings found!" });
    }

    // Step:1 iterate thruogh the req.body and insert all the bookingId's into an array

    // Step:2 pass this array into mongoose and find all the related docs from trips collection.

    // Step:3 send all the found docs as result

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
module.exports = fetchBookings;
