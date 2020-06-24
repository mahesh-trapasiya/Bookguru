const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var multer = require("multer");

const booksRoutes = require("./Routes/Book");
const usersRoutes = require("./Routes/User");
const authRoutes = require("./Routes/Auth");

const cors = require("cors");

const countryRoutes = require("./Routes/Country");

const app = express();
dotenv.config();

//Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) =>
  debug(`MongoDB connection error: ${err}`)
);

//Bring Routes
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(booksRoutes);
app.use(usersRoutes);
app.use(authRoutes);
app.use(countryRoutes);

mongoose.set("debug", true);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is Up and Running");
});
