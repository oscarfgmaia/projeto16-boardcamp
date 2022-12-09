import express from 'express'
import dotenv from 'dotenv'
import customersRouter from "./routes/customersRouter.js"
import categoriesRouter from "./routes/categoriesRouter.js"
import rentalsRouter from "./routes/rentalsRouter.js"
import gamesRouter from "./routes/gamesRouter.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(customersRouter);
app.use(categoriesRouter);
app.use(rentalsRouter);
app.use(gamesRouter);

app.listen(4000, () => console.log(`Running at port 4000`))