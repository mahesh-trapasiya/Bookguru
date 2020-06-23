const User = require("../Models/User");

exports.addBookFavorite = async (req, res, next) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        $push: {
          favorites: {
            bokk: req.body.bookId,
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
