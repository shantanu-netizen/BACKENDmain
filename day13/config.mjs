import dotenv from 'dotenv'
dotenv.config()
let uri = process.env.MONGODB_URI;
let port = process.env.PORT;
export { uri, port };