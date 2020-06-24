const express = require("express");
const booksController = require("../Controllers/Book");
const authCheck = require("../middleware/AuthCheck");

const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/user/addbook", authCheck, booksController.addBook);
// router.post("/api/addcategories", booksController.addCategories);
router.get("/getcategories", authCheck, booksController.getCategories);
router.get(
  "/book/toplikedbooks",
  authCheck,
  booksController.topFiveMostLikedBook
);
router.put("/book/like", authCheck, booksController.likeBook);
router.put("/book/unlike", authCheck, booksController.unlikeBook);
router.put("/book/comment", authCheck, booksController.commentBook);
router.put("/book/uncomment", authCheck, booksController.uncommentBook);
router.put("/book/delete/:bookId", authCheck, booksController.deleteBook);

module.exports = router;
