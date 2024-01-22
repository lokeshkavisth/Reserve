const Location = require("../../models/location");

const fetchLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    if (!locations || locations.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No location found!" });
    }

    res.status(200).json({ success: true, locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = fetchLocations;
