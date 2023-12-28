import express from 'express'
import { createProduct, createProductReview, deleteProduct, getAllProducts, getProductById, getTopProducts, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.get("/top", getTopProducts)
router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin, updateProduct)
router.delete("/:id", protect, admin, deleteProduct)
router.post("/:id/reviews", protect, createProductReview)


export default router