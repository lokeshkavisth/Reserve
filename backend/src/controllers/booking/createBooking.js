require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Booking } = require("../../models/models");

const createBooking = async (req, res) => {
  const { amount, currency, description, token } = req.body;

  try {
    const booking = await Booking.create(req.body);

    if (!booking) {
      return res
        .status(422)
        .json({ success: false, error: "Failed to create booking" });
    }

    const { client_secret } = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      payment_method_data: {
        type: "card",
        card: {
          token: token,
        },
      },
    });

    return res.status(201).json({
      success: true,
      booking,
      clientSecret: client_secret,
    });
  } catch (error) {
    console.error("Error creating booking", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error", msg: error });
  }
};

module.exports = createBooking;
