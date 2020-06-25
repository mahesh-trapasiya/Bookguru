const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const booksRoutes = require("./Routes/Book");
const usersRoutes = require("./Routes/User");
const authRoutes = require("./Routes/Auth");
const countryRoutes = require("./Routes/Country");

const app = express();
dotenv.config();

//Connect To databse
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));
mongoose.connection.on("error", (err) =>
  debug(`MongoDB connection error: ${err}`)
);

app.use(morgan("dev"));
app.use(cors());
//Bring Routes
app.use(bodyParser.json());
app.use(booksRoutes);
app.use(usersRoutes);
app.use(authRoutes);
app.use(countryRoutes);

//Set Debugging Mode On
mongoose.set("debug", true);

//Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is Up and Running");
});
