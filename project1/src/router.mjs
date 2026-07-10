import express from 'express'
import mongoose from 'mongoose'
import { author } from './controllers/authorcontrollers.mjs'
import { blog, deleteblog, getblog } from './controllers/blogcontrollers.mjs'
const router = express.Router()
router.post('/author', author)
router.post('/blog', blog)
router.get('/getblog', getblog)
router.delete('/delete', deleteblog)
export default router