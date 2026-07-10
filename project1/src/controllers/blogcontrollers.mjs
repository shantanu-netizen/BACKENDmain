import express from 'express'
import mongoose from 'mongoose'
import authorModel from '../models/authormodel.mjs'
import blogModel from '../models/blogmodel.mjs'
const blog = async (req, res) => {
    try {
        let data = req.body
        let authorId = data.authorId
        if (!authorId) {
            return res.status(400).send({message:"failed",error:"authorId is required"})
        }
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res
              .status(400)
              .send({ message: "failed", error: "authorId is not valid" });
        }
        const author = await authorModel.findById(authorId)
        if (author == null) {
            return res
              .status(400)
              .send({ message: "failed", error: "authorId not found"});
        }
        const blog=await blogModel.create(data)
        return res.status(201).send({status:true,data:blog })
    } catch (error) {
        if (error.message.includes("duplicate")) {
          return res
            .status(400)
            .send({ message: "failed", error: error.message });
        } else if (error.message.includes("validation")) {
          return res
            .status(400)
            .send({ message: "failed", error: error.message });
        } else {
          return res
            .status(500)
            .send({ message: "failed", error: error.message });
        }
    }
}
const getblog = async (req, res) => {
    try {
        let query = { isDeleted: false, isPublished: true }
        let { authorId, category, subcategory, tags } = req.query;
        if (authorId) {
            query.authorId=authorId
        }
        if (category) {
          query.category = category;
        }
        if (tags) {
          query.tags = { $in: tags };
        }
        if (subcategory) {
          query.subcategory = { $in: subcategory };
        }
        let blogs = await blogModel.find(query)
        if (blogs.length == 0) {
            return res.status(404).send({status: false,message:"blog not found"})
        }
        return res
          .status(200)
          .send({ status: true, message: "Blogs list", data: blogs });
    } catch (error) {
         return res
           .status(500)
           .send({ status: false, message: "Internal error" });
    }
}
const deleteblog = async (req, res)=>{
  try {
    const { blogId } = req.params
    const blogs = await blogModel.findOne({ _id: blogId })
    if (blog == null) {
      return res.status(404).send({message:"Blog does not exist", status:"false"})
    }
    return res.status(200).send({status:true, message:""})
  } catch (error) {
     return res
           .status(500)
           .send({ status: false, message: "Internal error" });
    }
  }
export {blog, getblog, deleteblog}