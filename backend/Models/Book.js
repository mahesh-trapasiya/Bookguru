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
    required: true,
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
        ref: "User",
      },
    },
  ],
  likes: [
    {
      likedby: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
