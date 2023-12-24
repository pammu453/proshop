import express from 'express'
import { createProduct, getAllProducts, getProductById } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", protect, admin, createProduct)

export default router