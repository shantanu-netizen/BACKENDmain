import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const authorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "fname is required."],
  },
  lname: {
    type: String,
    required: [true, "lmane is required."],
  },
  title: {
    type: String,
    required: [true, "title is required."],
    enum: {
      values: ["Mr", "Mrs", "Miss"],
      message:"only [Mr, Mrs, Miss] values are allowed",
    },
  },
  email: {
    type: String,
    required: [true, "Email address is required."],
    unique: true, // Creates a unique index for the field
    lowercase: true,
    trim: true,
    match: [emailRegex, "please filled valid email"],
  },
  password: {
    required: [true, "password is required."],
    type: String,
  },
},{timestamps:true});
let authorModel = mongoose.model("Author", authorSchema);
export default authorModel;