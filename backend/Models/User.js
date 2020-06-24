const mongoose = require("mongoose");
const { create } = require("lodash");
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
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
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
      type: Schema.Types.ObjectId,
      ref: "Book",
      created: Date,
    },
  ],
  booksreaded: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  readlater: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  lastLoggedIn: {
    type: Date,
  },
});

module.exports = mongoose.model("Users", UserSchema);
