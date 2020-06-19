const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();

//Database
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log("Db COnnection Failed", err);
});

//Bring Routes
const booksRoutes = require("./Routes/Book");
app.use(morgan("dev"));
app.use(booksRoutes);

app.get("/", booksRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Test");
});
