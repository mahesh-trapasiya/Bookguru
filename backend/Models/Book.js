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
    type: String,
  },
  author: {
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

      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  deslikes: [
    {
      deslikedBy: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },

      created: {
        type: Date,
      },
    },
  ],

  status: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  reads: [
    {
      readBy: { type: Schema.Types.ObjectId, ref: "Users" },
    },
  ],
});

module.exports = mongoose.model("books", bookSchema);
