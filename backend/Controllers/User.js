const User = require("../Models/User");
const Book = require("../Models/Book");

exports.addBookFavorite = async (req, res, next) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: {
          favorites: {
            book: req.body.bookId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.removeFavoriteBook = async (req, res, next) => {
  try {
    const UpdatedUser = await Book.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { favorites: { book: req.body.bookId } },
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.addBookreadLater = async (req, res, next) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: {
          favorites: {
            book: req.body.bookId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.removeReadLater = async (req, res, next) => {
  try {
    const UpdatedUser = await Book.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { readlater: { book: req.body.bookId } },
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.recentlyThreeBooksRead = async (req, res, next) => {
  try {
    const books = User.findById(req.auth._id)
      .populate("favorites", "_id name created")
      .sort({ "favorites.created": -1 })
      .limit(3);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};

exports.randomThreeBooksFromReadLater = async (req, res, next) => {
  try {
    const books = User.find(req.auth._id)
      .populate("favorites", "_id name created")
      .limit(3);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};
