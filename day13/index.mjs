import express from 'express'
import mongoose from 'mongoose'
import router from './src/router.mjs'
import { port,uri } from './config.mjs'
const app = express()
app.use(express.json())
mongoose.connect(uri).then(() => console.log("database successfully connected")).catch((err) => console.log(err))
app.use("/", router)
app.listen(port, () => { console.log(`your port is ${port}`) })
