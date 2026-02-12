import dotenv from "dotenv";
dotenv.config();
let uri = process.env.MongoosURI;
let PORT = process.env.PORT;
export { uri, PORT };
