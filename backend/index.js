import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config()

import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMidleware.js";

const port = process.env.PORT || 5001;
const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser midlleware
app.use(cookieParser())

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})