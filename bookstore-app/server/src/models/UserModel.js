import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
});

export const UserModel = mongoose.model("users", UserSchema);
