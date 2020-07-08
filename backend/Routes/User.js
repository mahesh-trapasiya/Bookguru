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

router.get(
  "/user/recentthreereads",
  authCheck,
  usersController.recentThreeReads
);

router.get(
  "/user/recentthreefavorites",
  authCheck,
  usersController.recentThreeFavourites
);

module.exports = router;
