const express = require("express");

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8585;
const { errorHandler } = require("./Helpers/dbErrorHandler");
const { connectToDatabase } = require("./Helpers/dbConnection");

// const runSeed = require("./seeds");

app.use(cors());
app.use(express.json());

app.use("/api/auth-user", require("./routes/auth-user"));
app.use("/api", require("./routes/profileRoutes"));
app.use("/api", require("./routes/bookingRoutes"));

// Database connection
connectToDatabase();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to gaming app Home");
});

async function startServer() {
  app.listen(port, () => {
    console.clear();
    console.log(
      `Server is running on port ${port} at ${process.env.NODE_ENV} mode`
    );
  });
}
// global error handler
app.use(function (err, req, res, next) {
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong! ****SERVER_ERROR****",
  });
});

startServer();
