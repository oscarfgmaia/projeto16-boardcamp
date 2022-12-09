import dotenv from 'dotenv'
import pkg from 'pg'
const {Pool} = pkg;
dotenv.config();

export const connectionDb = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });