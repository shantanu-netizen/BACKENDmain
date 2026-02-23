import dotenv from 'dotenv'
dotenv.config()
let uri = process.env.MONGODBURI;
let port = process.env.PORT;
let JWT_SECRET = process.env.secretToken;
export { uri, port, JWT_SECRET };