import mongoose from "mongoose";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const authorSchema = new mongoose.Schema({
        fname: { type:String, required: true },
        lname: {type:String, required: true },
    title: {
        type:String,
        required: true,
        enum: {
        values: ["Mr", "Mrs", "other"],
        message: 'Only [Mr, Mrs, other] are allowed'
     } },
        email: {
    type: String,
    required: true,
    match: [emailRegex, "Please enter a valid email"],
    unique: true
},
    password: {type:String, required: true}
},{timestamps:true})
const authorModel = mongoose.model("author", authorSchema);
export default authorModel;
