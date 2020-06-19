const express = require("express");
const booksController = require("../Controllers/Book");

const router = express.Router();

router.get("/", booksController.getBooks);
router.post("/api/addbook", booksController.addBook);

module.exports = router;
