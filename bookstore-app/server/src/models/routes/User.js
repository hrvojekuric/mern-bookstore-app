import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel({ username, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.status(401).json({ message: "Username or password is incorrect." });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Username or password is incorrect" });
  }
  try {
    const token = jwt.sign({ id: user._id }, "secret");
    res.status(200).json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as UserRouter };

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
