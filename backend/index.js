import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()
import products from "./data/products.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5001;

const app = express();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API is running...")
})

app.get("/api/products", (req, res) => {
    res.json(products)
})

app.get("/api/product/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})