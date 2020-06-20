const Book = require("../Models/Book");
const Category = require("../Models/BookCategory");

const categoryList = [
  { name: "Fantasy" },
  { name: "Adventure" },
  { name: "Romance" },
  { name: "Contemporary" },
  { name: "Dystopian" },
  { name: "Mystery" },
  { name: "Horror" },
  { name: "Thriller" },
  { name: "Paranormal" },
  { name: "Historical fiction" },
  { name: "Science Fiction" },
  { name: "Memoir" },
  { name: "Cooking" },
  { name: "Art" },
  { name: "Self-help / Personal" },
  { name: "Development" },
  { name: "Motivational" },
  { name: "Health" },
  { name: "History" },
  { name: "Travel" },
  { name: "Guide / How-to" },
  { name: "Families & Relationships" },
  { name: "Humor" },
  { name: "Children’s" },
];

//Adding Categories Of Book To The Database
exports.addCategories = (req, res) => {
  Category.insertMany(categoryList, function (error, docs) {
    return res.json({ msg: "Categories Added Successfully" });
  });
};

exports.getBooks = (req, res) => {
  res.json({
    books: [{ title: "First Book" }],
  });
};

exports.addBook = async (req, res) => {
  const book = new Book({
    category: req.body.category,
    name: req.body.name,
    pages: req.body.pages,
    reference: req.body.reference,
    postedBy: req.body.postedBy,
    upload: req.file,
  });

  try {
    const result = await book.save();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
};
