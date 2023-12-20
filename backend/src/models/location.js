const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  district: String,
});

const Location = model("location", locationSchema);

module.exports = Location;
