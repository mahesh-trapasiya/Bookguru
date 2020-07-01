const express = require("express");
const booksController = require("../Controllers/Book");
const multer = require("multer");
const authCheck = require("../middleware/AuthCheck");
const router = express.Router();

router.get("/", booksController.getBooks);
router.post(
  "/user/addbook",
  authCheck,
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
  }).single("book"),
  booksController.addBook
);
router.get("/getcategories", booksController.getCategories);
router.get(
  "/book/toplikedbooks",
  authCheck,
  booksController.topFiveMostLikedBook
);
router.put("/book/like", authCheck, booksController.likeBook);
router.put("/book/unlike", authCheck, booksController.unlikeBook);
router.put("/book/dislike", authCheck, booksController.DislikeBook);
router.put("/book/undislike", authCheck, booksController.removeDislikeBook);
router.put("/book/comment", authCheck, booksController.commentBook);
router.put("/book/uncomment", authCheck, booksController.uncommentBook);
router.put("/book/delete/:bookId", authCheck, booksController.deleteBook);
router.get("/book/by/:userId", authCheck, booksController.booksByUserId);
router.get("/book/:bookId", authCheck, booksController.bookById);
router.get("/books", booksController.getBooks);
// router.post("/api/addcategories", booksController.addCategories);

module.exports = router;
