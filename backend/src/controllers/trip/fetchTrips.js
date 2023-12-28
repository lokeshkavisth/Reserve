const { Trip } = require("../../models/models");

const fetchTrips = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const mainQuery = {};

    // Exclude 'page' from the main query
    if (Object.keys(req.query).length >= 1) {
      for (const key in req.query) {
        if (key !== "page") {
          mainQuery[key] = req.query[key];
        }
      }
    }

    const trips = await Trip.find(mainQuery).skip(skip).limit(limit);

    if (trips.length === 0) {
      return res.status(404).json({ success: false, error: "No trips found!" });
    }

    return res.status(200).json({ success: true, trips });
  } catch (error) {
    console.error("Error fetching trips", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = fetchTrips;
