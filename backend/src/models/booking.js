const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Length of the uid should be greater or equal to 1"],
  },
});

const Booking = model("booking", bookingSchema);

module.exports = Booking;
