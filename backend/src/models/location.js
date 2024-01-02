const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  district: { type: String, trim: true, required: true },
});

const Location = model("location", LocationSchema);

module.exports = Location;
