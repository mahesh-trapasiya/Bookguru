const Book = require("../Models/Book");
const Category = require("../Models/BookCategory");
const { uploadImageToFirebase } = require("../Helper/FileUpload");
const { _ } = require("lodash");
const User = require("../Models/User");

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

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: false })
      .populate("category", "name")
      .populate("author", "fname");

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({
      error: "Error While Fetching Books",
    });
  }
};

exports.booksByUserId = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.userId });

    return res.status(200).json({
      books,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong...." });
  }
};

exports.addBook = async (req, res, next) => {
  try {
    // const imgUrl = uploadImageToFirebase(req.file);
    const book = new Book({
      category: req.body.category,
      name: req.body.name,
      pages: req.body.pages,
      reference: req.body.reference,
      author: req.auth._id,
      upload: req.file.path,
    });
    const result = await book.save();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong..." });
    console.log(err);
  }
};

exports.likeBook = async (req, res, next) => {
  try {
    const UpdatedLike = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $push: {
          likes: {
            likedBy: req.auth._id,
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
/* 
exports.favouriteBook = async (req, res, next) => {
  try {
    const UpdatedFavorites = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $push: {
          favorites: {
            book: req.body.bookId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(UpdatedFavorites);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.removeFavouriteBook = async (req, res, next) => {
  try {
    const UpdatedFavorites = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { favorites: { book: req.body.bookId } },
      },
      { new: true }
    );
    res.status(200).json(UpdatedFavorites);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
}; */

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

exports.DislikeBook = async (req, res, next) => {
  console.log(req.body.userId);

  try {
    const UpdatedLike = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $push: {
          deslikes: {
            deslikedBy: req.auth._id,
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

exports.removeDislikeBook = async (req, res, next) => {
  try {
    const UpdatedLike = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $pull: { deslikes: { deslikedBy: req.auth._id } },
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
  let comment = req.body.comment;

  console.table(comment);
  try {
    const UpdatedComment = await Book.findByIdAndUpdate(
      req.body.bookId,
      {
        $push: { comments: { text: comment, postedBy: req.auth._id } },
      },
      { new: true }
    ).populate("comments.postedBy", "_id fname");
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
  const book = req.params.bookId;
  if (!book) {
    return res.json({ msg: "book not Found" });
  }
  //console.table(req.auth.role);
  if (req.auth.role != "Reader" && req.auth.role != "Writer") {
    return res(401).json({
      msg: "Not authorized user for deleting this book.",
    });
  }
  try {
    const result = await Book.remove({ _id: req.params.bookId });
    return res.status(200).json({ msg: "book deleted successfully." });
  } catch (error) {
    return res.status(500).json("Something Went Wrong...");
  }
};

exports.topFiveMostLikedBook = async (req, res, next) => {
  try {
    const result = await Book.find({ author: req.auth._id })
      .populate("category", "name")

      .sort({ likes: 1 })
      .limit(5);

    return res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong...",
    });
  }
};

exports.makeBookPrivate = async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);

  try {
    const UpdatedStatus = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        $set: { status: !book.status },
      },
      { new: true }
    );
    res.status(200).json(UpdatedStatus);
  } catch (error) {
    /*  res.status(500).json({
      error: "Something Went Wrong",
    }); */
    console.log(error);
  }
};

exports.bookById = async (req, res) => {
  try {
    const books = await Book.find({ _id: req.params.bookId })
      .populate("author", "fname lname")
      .populate("category", "name")
      .populate("comments.postedBy", "fname lname ");

    return res.status(200).json({
      books,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong...." });
  }
};

exports.updateBook = async (req, res, next) => {
  const bookData = JSON.parse(JSON.stringify(req.body));
  console.log(req.file);

  if (req.body) {
    try {
      const result = await Book.findByIdAndUpdate(req.params.bookId, {
        $set: {
          name: bookData.name,
          references: bookData.references,
          pages: bookData.pages,
        },
      });

      await result.save();
      res.status(200).json({ result });
    } catch (error) {
      // return res.status(500).json("Something Went Wrong...");
      console.log(error);
    }
  }
};
exports.getAllBooks = async (req, res) => {
  try {
    console.log("text________________________");
    const books = await Book.find({ status: false });
    res.status(200).json({ books });
  } catch (error) {
    // res.status(500).json({ error: "Something went wrong...." });
    console.log(error);
  }
};

exports.topFiveReadCount = async (req, res, next) => {
  try {
    const result = await Book.find({ author: req.auth._id })
      .populate("category", "name")
      .select("reads likes comments name ")
      .sort({ reads: "asc" })
      .limit(5);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
