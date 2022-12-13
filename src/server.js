import express from 'express'
import dotenv from 'dotenv'
import customersRouter from "./routes/customersRouter.js"
import categoriesRouter from "./routes/categoriesRouter.js"
import rentalsRouter from "./routes/rentalsRouter.js"
import gamesRouter from "./routes/gamesRouter.js"
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(customersRouter);
app.use(categoriesRouter);
app.use(rentalsRouter);
app.use(gamesRouter);

const port = process.env.PORT
app.listen(port, () => console.log(`Running at port ${port}`))