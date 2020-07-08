const User = require("../Models/User");
const Book = require("../Models/Book");

exports.addBookFavorite = async (req, res, next) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $push: {
          favorites: {
            book: req.params.bookId,
            created: Date.now(),
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
      req.auth._id,
      {
        $pull: { favorites: { book: req.params.bookId } },
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
      .sort({ "favorites.created": -1 })
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
  try {
    const user = await User.findById(req.auth._id)
      .populate("readlater", "name upload")
      .select("readlater");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Something Went Wrong..." });
  }
};

exports.addToBooksReaded = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    const book = await Book.findById(req.body.bookId);
    const abc = Date(user.booksreaded.readed);
    let counter = 0;
    let currentMonth = new Date().getMonth() + 1;

    user.booksreaded.forEach((read) => {
      let month = new Date(read.readed).getMonth() + 1;
      if (currentMonth == month) {
        counter++;
      }
    });
    if (user.booksreaded && user.booksreaded.length >= 1) {
      const getindex = user.booksreaded.findIndex((book) => {
        return book.book === req.body.bookId;
      });

      if (getindex !== -1) {
        res.status(200).json({ readAllowed: true });
      }
    }

    if (user.plan == "standard" && counter >= 3) {
      return res.json({
        error:
          "Book Reading Limit Exceded For This Month. TO Read More Book Please Upgrade Your Plan.",
        readAllowed: false,
      });
    }

    if (user.plan == "basic" && counter >= 1) {
      return res.json({
        error:
          "Book Reading Limit Exceded For This Month. To Read More Book Please Upgrade Your Plan.",
        readAllowed: false,
      });
    }

    if (user.plan == "prime" && user.booksreaded) {
      if (counter >= 7) {
        return res.json({
          error:
            "Book Reading Limit Exceded For This Month. TO Read More Book Please Upgrade Your Plan",
          readAllowed: false,
        });
      }
    }

    const bookindex = book.reads.findIndex((e) => e.readBy == req.auth._id);
    const userindex = user.booksreaded.findIndex(
      (e) => e.book == req.body.bookId
    );
    if (userindex == -1) {
      user.booksreaded.push({
        book: req.body.bookId,
        readed: Date.now(),
      });
      await user.save();
    }
    if (bookindex == -1) {
      book.reads.push({
        readBy: req.auth._id,
      });
      await book.save();
    }

    res.status(200).json({ readAllowed: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

exports.recentThreeReads = async (req, res, next) => {
  try {
    const result = await User.findById(req.auth._id)
      .populate("booksreaded.book", "name upload")
      .populate("favorites.book.author", "fname lname")

      .sort({ "booksreaded.$[].readed": -1 })
      .limit(3)
      .select("booksreaded");

    return res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
};
exports.recentThreeFavourites = async (req, res, next) => {
  try {
    const result = await User.findById(req.auth._id)
      .populate("favorites.book", "name upload author")
      .populate("favorites.book.author", "fname lname")
      .sort({ "favorites.$[].created": -1 })
      .limit(3)
      .select("favorites");

    return res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
};
