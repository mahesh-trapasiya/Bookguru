const Book = require("../Models/Book");

exports.getBooks = (req, res) => {
  res.json({
    books: [{ title: "First Book" }],
  });
};

exports.addBook = (req, res) => {
  const book = new Book(req.body);

  book.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      book: result,
    });
  });
};
