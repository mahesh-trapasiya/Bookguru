const express = require("express");
const usersController = require("../Controllers/User");
const authCheck = require("../middleware/AuthCheck");

const router = express.Router();

// router.post("/api/adduser", usersController.);

router.put(
  "/user/addfavorite/:bookId",
  authCheck,
  usersController.addBookFavorite
);
router.put(
  "/user/removefavorite/:bookId",
  authCheck,
  usersController.removeFavoriteBook
);
router.put(
  "/user/addreadlater/:bookId",
  authCheck,
  usersController.addBookreadLater
);
router.put(
  "/user/removereadlater/:bookId",
  authCheck,
  usersController.removeReadLater
);
router.get("/user/profile/:userId", authCheck, usersController.userById);
router.get(
  "/randomthreebooks",
  authCheck,
  usersController.randomThreeBooksFromReadLater
);
router.put("/add/book/readed", authCheck, usersController.addToBooksReaded);

/* router.delete(
  "/api/user/book/read/:bookId",
  authCheck,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.auth._id);

      const index = user.currentReading.findIndex((value) => {
        return value.book.toString() === req.params.bookId;
      });

      if (index !== -1) {
        user.currentReading.splice(index, 1);

        //when everything is alright
        //user.currentReading.push(req.body.bookId);

        await user.save();

        return res.status(200).json({
          successText: "Book removed from continue list...",
          isRemoved: true,
        });
      } else {
        return res.json({ error: "Book not found...", isRemoved: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong..." });
    }
  }
); */

module.exports = router;
