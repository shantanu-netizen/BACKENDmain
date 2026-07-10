import dotenv from 'dotenv'
dotenv.config();
const config = {
  port: process.env.PORT,
  uri: process.env.MongoosURI,
};
export default config;