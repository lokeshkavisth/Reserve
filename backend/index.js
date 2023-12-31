require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./src/config/database");
const router = require("./src/routes/routes");

const app = express();
app.use(cors({ origin: "https://reserve-buses.netlify.app/" }));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
  connectToMongo();
});
