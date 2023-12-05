import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";


//@desc Fetch all Products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async (_req, res) => {
    const products = await Product.find({});
    if (products) return res.json(products)
    res.status(404)
    throw new Error("Products not found")
})

//@desc Fetch Products by id
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) return res.json(product)
    res.status(404)
    throw new Error("Product not found")
})


export {getAllProducts,getProductById}