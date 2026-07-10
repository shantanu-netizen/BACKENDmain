import mongoose from "mongoose";
import authorModel from "../models/authormodel.mjs";
const author = async (req, res)=>{
    try {
        console.log(req.body)
        const data = req.body
        const author=await authorModel.create(data)
        return res.status(201).send({ message: "Document create successfully" ,data:author })
    } catch (error) {
        if (error.message.includes('duplicate')) {
            return res.status(400).send({ message: 'failed', error: error.message })
        }
         else if (error.message.includes('validation')) {
            return res.status(400).send({ message: 'failed', error: error.message })
        }
         else {
              return res.status(500).send({ message: 'internal error', error: error.message })
        }
    }
}
export {author}
