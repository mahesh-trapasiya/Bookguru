const Book = require("../Models/Book");

exports.getBooks = (req, res) => {
  res.send("Hello");
};

exports.addBook = (req, res) => {
  const book = new Book(req.body);
  console.log("created", book);
};
