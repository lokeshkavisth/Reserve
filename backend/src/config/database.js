require("dotenv").config();
const { mongoose } = require("mongoose");

const connectToMongo = async () => {
  try {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI, { dbName: "reserve" });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    process.exit(1);
  }
};

module.exports = connectToMongo;
