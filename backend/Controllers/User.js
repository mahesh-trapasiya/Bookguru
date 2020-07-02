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
      req.auth._id,
      {
        $push: {
          readlater: {
            book: req.params.bookId,
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
    const UpdatedUser = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { readlater: { book: req.params.bookId } },
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

exports.hasAuthorization = (req, res, next) => {
  if (req.auth.role != "Writer" && req.auth.role != "Reader") {
    return res.json({ msg: "Not authorized user for this action." });
  }
  if (req.auth.role == "admin") {
    //return res.json({ msg: "is admin" });

    return next();
  }

  if (req.auth._id != req.profile._id) {
    return res.status(401).json({
      msg: "Not authorized user for this action id not matched.",
    });
  }
  next();
};

exports.userById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new Error("User not Found."));
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Something Went Wrong..." });
  }
};

exports.randomThreeBooksFromReadLater = async (req, res) => {
  console.log(req.auth.userId);

  try {
    const user = await User.find({ _id: req.auth._id }).select("readlater");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Something Went Wrong..." });
  }
};

exports.addToBooksReaded = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    const book = await Book.findById(req.body.bookId);

    if (user.booksreaded && user.booksreaded.length >= 1) {
      const getindex = user.booksreaded.findIndex((book) => {
        return book.book === req.body.bookId;
      });
      if (getindex !== -1) {
        res.status(200).json({ readAllowed: true });
      }
    }

    if (user.plan == "standard" && user.booksreaded) {
      if (user.booksreaded.length >= 3) {
        return res.json({
          error:
            "Book Reading Limit Exceded. TO Read More Book Please Upgrade Your Plan.",
          readAllowed: false,
        });
      }
    }

    if (user.plan == "basic" && user.booksreaded) {
      if (user.booksreaded.length >= 1) {
        return res.json({
          error:
            "Book Reading Limit Exceded. To Read More Book Please Upgrade Your Plan.",
          readAllowed: false,
        });
      }
    }

    if (user.plan == "prime" && user.booksreaded) {
      if (user.booksreaded.length >= 7) {
        return res.json({
          error:
            "Book Reading Limit Exceded. TO Read More Book Please Upgrade Your Plan",
          readAllowed: false,
        });
      }
    }



    user.booksreaded.push({
      book: req.body.bookId,
      readed: Date.now(),
    });

    const bookindex = book.reads.find((o) => o.readBy == req.auth._id);

    if (!bookindex) {
      book.reads.push({
        readBy: req.auth._id,
      });
      await book.save();
    }

    await user.save();

    res.status(200).json({ readAllowed: true });
  } catch (error) {
    // res.status(500).json({ error: "Something went wrong..." });
    console.log(error);
  }
};
