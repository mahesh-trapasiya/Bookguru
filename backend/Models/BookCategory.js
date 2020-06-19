const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BooksCategories", BookCategorySchema);
