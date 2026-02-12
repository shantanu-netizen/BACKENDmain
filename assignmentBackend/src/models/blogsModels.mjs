import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
     
    },

    body: {
      type: String,
      required: true,
     
        },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: true,
      
    },

    subcategory: {
      type: [String],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const blogModel = mongoose.model("Blog", blogsSchema);
export default blogModel;
