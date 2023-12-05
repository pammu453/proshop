import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()

import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMidleware.js";

const port = process.env.PORT || 5001;
const app = express();

connectDB();

app.use(cors());

app.use("/api/products", productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})