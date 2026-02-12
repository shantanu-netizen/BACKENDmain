import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    enum: {
      values: ["Mr", "Mrs", "Miss"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});
let authorModel = mongoose.model("Author", authorSchema);
export default authorModel;