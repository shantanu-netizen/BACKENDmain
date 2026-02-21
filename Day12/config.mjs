import dotenv from "dotenv";
dotenv.config();
const config = {
  mongoURI: process.env.MongoDB,
  port: process.env.port || 8000,
};
export default config;
