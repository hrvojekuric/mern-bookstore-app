import express from "express";
import { BookModel } from "../BookModel.js";
import mongoose from "mongoose";
import { verifyToken } from "./User.js";
import { UserModel } from "../UserModel.js";

const router = express.Router();

//create a book

router.post("/", verifyToken, async (req, res) => {
  const result = new BookModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    year: req.body.year,
    author: req.body.author,
    image: req.body.image,
    storeUser: req.body.storeUser,
  });

  try {
    const newBook = await result.save();
    res.status(201).json({
      createdBook: {
        title: newBook.title,
        yearOfRelease: newBook.year,
        nameOFAuthor: newBook.year,
        coverImage: newBook.image,
        _id: newBook._id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get books

router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Save a book

router.put("/", async (req, res) => {
  const book = await BookModel.findById(req.body.bookID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedBooks.push(book);
    await user.save();
    res.status(201).json({ savedBooks: user.savedBooks });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get id of saved books

router.get("/getIdOfSavedBooks/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.status(200).json({ savedBooks: user?.savedBooks });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get save books

router.get("/savedBooks/:<userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedBooks = await BookModel.find({
      _id: { $in: user.savedBooks },
    });
    res.status(200).json({ savedBooks });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as BookRouter };
