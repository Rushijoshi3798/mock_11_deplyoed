const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
    userId: String
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("books", bookSchema);

module.exports = {
    BookModel,
};