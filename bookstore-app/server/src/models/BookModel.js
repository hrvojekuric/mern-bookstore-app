import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  storeUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const BookModel = mongoose.model("books", BookSchema);
