const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect To Database
mongoose.connect(config.database, {
  useMongoClient: true
});

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});
// On Error
mongoose.connection.on("error", err => {
  console.log("Database error " + err);
});

const app = express();

const users = require("./routes/users");
const tours = require("./routes/tours");
const tourDates = require("./routes/tourDates");
const contacts = require("./routes/contacts");

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/tours", tours);
app.use("/tourDates", tourDates);
app.use("/contacts", contacts)

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./angular-src/src/index.html"));
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});