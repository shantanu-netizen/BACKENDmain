import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  authorId: { type: mongoose.Types.ObjectId, required: true, refs: "author" },
  tags: { type: [String] },
  category: { type: String, required: true },
  subcategory: { type: [String] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now() },
  isPublished: { type: Boolean, default: false },
});
const blogModel = mongoose.model("blog", blogSchema);
export default blogModel;