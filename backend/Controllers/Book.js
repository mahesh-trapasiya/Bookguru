const Book = require("../Models/Book");
const Category = require("../Models/BookCategory");
const { uploadImageToFirebase } = require("../Helper/FileUpload");

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
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong...." });
  }
};

exports.getBooks = (req, res) => {
  res.json({
    books: [{ title: "First Book" }],
  });
};

exports.addBook = async (req, res, next) => {
  try {
    const book = new Book({
      category: req.body.category,
      name: req.body.name,
      pages: req.body.pages,
      reference: req.body.reference,
      postedBy: req.body.postedBy,
      // upload: req.file,
    });
    const result = await book.save();
    // uploadImageToFirebase(req.file);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
};

exports.likeBook = async (req, res, next) => {
  try {
    const UpdatedLike = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $push: {
          likes: {
            user: req.body.userId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(UpdatedLike);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.unlikeBook = async (req, res, next) => {
  try {
    const UpdatedLike = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $pull: { likes: { user: req.body.userId } },
      },
      { new: true }
    );
    res.status(200).json(UpdatedLike);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.commentBook = async (req, res, next) => {
  try {
    let comment = req.body.comment;
    comment.bookedBy = req.body.userId;

    const UpdatedComment = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.bookedBy", "_id name")
      .populate("bookedBy", "_id name");
    res.status(200).json(UpdatedComment);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.uncommentBook = async (req, res, next) => {
  try {
    let comment = req.body.comment;

    const UpdatedComment = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    )
      .populate("comments.bookedBy", "_id name")
      .populate("bookedBy", "_id name");
    res.status(200).json(UpdatedComment);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.deleteBook = async (req, res, next) => {
  const book = req.book;
  if (!book) {
    return res.json({ msg: "book not Found" });
  }
  //console.table(req.auth.role);
  if (
    req.auth._id != req.book.bookedBy._id &&
    req.auth.role != "reader" &&
    req.auth.role != "writer"
  ) {
    return res(401).json({
      msg: "Not authorized user for deleting this book.",
    });
  }
  try {
    const result = await Book.remove({ _id: req.book._id });
    return res.status(200).json({ msg: "book deleted successfully." });
  } catch (error) {
    return res.status(500).json("Something Went Wrong...");
  }
};

exports.topFiveMostLikedBook = async (req, res, next) => {
  try {
    const result = await Book.findById(req.auth._id, { likes: 1 });

    return res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong...",
    });
  }
};

exports.makeBookPrivate = async (req, res, next) => {
  try {
    const UpdatedStatus = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $set: { status: !status },
      },
      { new: true }
    );
    res.status(200).json(UpdatedStatus);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.deletePostBook = async (req, res, next) => {
  const book = req.book;
  if (!book) {
    return res.json({ message: "Post not Found" });
  }
  //console.table(req.auth.role);
  if (
    req.auth._id != req.book.postedBy._id &&
    req.auth.role != "Writer" &&
    req.auth.role != "Reader"
  ) {
    return res(401).json({
      msg: "Not authorized user for deleting this Book",
    });
  }
  try {
    const result = await Book.remove({ _id: req.book._id });
    return res.status(200).json({ msg: "Book deleted successfully." });
  } catch (error) {
    return res.status(500).json("Something Went Wrong...");
  }
};
