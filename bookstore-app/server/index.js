import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { BookRouter } from "./src/models/routes/Book.js";
import { UserRouter } from "./src/models/routes/User.js";
import "dotenv/config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", BookRouter);
app.use("/users", UserRouter);

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => console.log("Server started"));
