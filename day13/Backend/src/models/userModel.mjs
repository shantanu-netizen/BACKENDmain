import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "phone is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  username: {
    type: String,
    required: [true, "username is mandatory"],
    unique: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ['Male', 'Female', 'Other'],
  },
  dob: {
    type: Date,
    required: [true, "dob is mandatory"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });
const userModel = mongoose.model("user", userSchema)
export default userModel;