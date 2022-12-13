import dotenv from 'dotenv'
import pkg from 'pg'
const {Pool} = pkg;
dotenv.config();

export const connectionDb = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:true
  });