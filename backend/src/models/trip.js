const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TripSchema = new Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "uid should be least 5 characters"],
  },
  departureDate: {
    type: Date,
    required: true,
    set: (value) => new Date(value),
    validate: [
      { validator: isValidDate, message: "Invalid date" },
      {
        validator: isDepartureBeforeArrival,
        message: "Departure must be at least 3 days before arrival",
      },
    ],
  },
  arrivalDate: {
    type: Date,
    required: true,
    set: (value) => new Date(value),
    validate: [
      { validator: isValidDate, message: "Invalid date" },
      {
        validator: isArrivalAfterDeparture,
        message: "Arrival must be at least 3 days after departure",
      },
    ],
  },
  origin: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Origin should be at least 3 characters"],
    set: (value) => value.toLowerCase(),
  },
  destination: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Destination should be at least 3 characters"],
    set: (value) => value.toLowerCase(),
  },
  ownerId: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, "Owner id should be at least 4 characters"],
    validate: {
      validator: isValidOwnerId,
      message: "Invalid owner id!",
    },
    default: () => uuidv4(),
    set: (value) => value.toLowerCase(),
  },
  departureTime: {
    type: Date,
    required: true,
    set: (value) => {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
    validate: { validator: isValidTime, message: "Invalid departure time" },
  },
  arrivalTime: {
    type: Date,
    required: true,
    set: (value) => {
      const [hours, minutes] = value.split(":").map(Number);
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
    validate: { validator: isValidTime, message: "Invalid arrival time" },
  },
  categories: { type: [String], required: true },
  seats: {
    type: [String],
    required: true,
  },
  busNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Bus number should be at least 5 characters"],
    maxlength: [15, "Bus number should not exceed 15 characters"],
    validate: { validator: isValidBusNumber, message: "Invalid bus number" },
    set: (value) => value.toLowerCase(),
  },
  amenities: {
    type: [String],
    required: true,
    validate: {
      validator: isValidAmenities,
      message: "Invalid amenities",
    },
  },
  fare: {
    type: Number,
    required: true,
    trim: true,
    set: (value) => parseInt(value, 10),
    min: [1, "Minimum bus fare should be 1"],
  },
  busName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Bus name should be at least 2 characters"],
    maxlength: [40, "Bus name should not exceed 40 characters"],
    set: (value) => value.toLowerCase(),
  },
});

function isValidDate(value) {
  return !isNaN(value);
}

function isDepartureBeforeArrival(value) {
  // Ensure that the difference between departure and arrival is at least 3 days
  const minGapInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  return value.getTime() < this.arrivalDate.getTime() - minGapInMilliseconds;
}

function isArrivalAfterDeparture(value) {
  // Ensure that arrival is at least 3 days after departure
  const minGapInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
  return value.getTime() > this.departureDate.getTime() + minGapInMilliseconds;
}

function isValidOwnerId(value) {
  // Accept numbers, symbols, and characters; disallow spaces and emojis
  return /^[0-9A-Za-z!@#$%^&*()-_=+[\]{};:'",.<>/?]+$/.test(value);
}

function isValidTime(value) {
  return !isNaN(value);
}

function isValidSeats(value) {
  return (
    Array.isArray(value) &&
    value.every((seat) => typeof seat === "string" && seat.trim().length > 0)
  );
}

function isValidBusNumber(value) {
  return /^[A-Za-z0-9]+$/.test(value);
}

function isValidAmenities(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (amenity) => typeof amenity === "string" && amenity.trim().length > 0
    )
  );
}

const Trip = model("trip", TripSchema);

module.exports = Trip;
