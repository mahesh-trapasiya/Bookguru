const express = require("express");
const booksController = require("../Controllers/Book");

const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/user/addbook", booksController.addBook);
// router.post("/api/addcategories", booksController.addCategories);
router.get("/getcategories", booksController.getCategories);
router.get("/toplikedbooks", booksController.topFiveMostLikedBook);

module.exports = router;
