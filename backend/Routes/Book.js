const express = require("express");
const booksController = require("../Controllers/Book");
const multer = require("multer");
const authCheck = require("../middleware/AuthCheck");
const router = express.Router();

router.get("/books", authCheck, booksController.getBooks);
router.post(
  "/user/addbook",
  authCheck,
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "upload");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
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
router.put("/book/update/:bookId", authCheck, booksController.updateBook);
router.delete("/book/delete/:bookId", authCheck, booksController.deleteBook);
router.get("/book/by/:userId", authCheck, booksController.booksByUserId);
router.get("/book/:bookId", authCheck, booksController.bookById);
router.put(
  "/book/changestatus/:bookId",
  authCheck,
  booksController.makeBookPrivate
);
router.get("/books", booksController.getBooks);
// router.post("/api/addcategories", booksController.addCategories);

module.exports = router;
