import express from 'express'
import dotenv from 'dotenv'
import customersRouter from "./routes/customersRouter.js"
dotenv.config();
const app = express();
app.use(express.json())
app.use(customersRouter)
app.listen(4000, () => console.log(`Running at port 4000`))