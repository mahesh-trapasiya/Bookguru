const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  photo: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    // default: Date.now,
  },
  intrest: [
    {
      type: Schema.Types.ObjectId,
      ref: "BooksCategories",
    },
  ],
  verificationcode: {
    type: String,
  },
  plan: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  favorites: [
    {
      book: { type: Schema.Types.ObjectId, ref: "books" },
      created: Date,
    },
  ],
  booksreaded: [
    {
      book: { type: Schema.Types.ObjectId, ref: "books" },
      readed: { type: Date },
    },
  ],
  readlater: [
    {
      book: { type: Schema.Types.ObjectId, ref: "books" },
    },
  ],
  resetPasswordLink: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", UserSchema);
