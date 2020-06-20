const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "BooksCategories",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: false,
  },
  upload: {
    type: Object,
    // required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  comments: [
    {
      text: String,
      created: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    },
  ],
  likes: [
    {
      likedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },

      likedFrom: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    default: "public",
  },
});

module.exports = mongoose.model("books", bookSchema);
