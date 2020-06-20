const express = require("express");
const booksController = require("../Controllers/Book");

const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/api/addbook", booksController.addBook);
// router.post("/api/addcategories", booksController.addCategories);

module.exports = router;
