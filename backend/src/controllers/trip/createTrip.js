const { Trip } = require("../../models/models");

const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);

    if (!trip) {
      return res
        .status(422)
        .json({ success: false, message: "Failed to create trip" });
    }

    res.status(201).json({ success: true, trip });
  } catch (error) {
    console.error("Error creating trip", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = createTrip;
