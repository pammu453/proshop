import express from 'express'
import { createProduct, createProductReview, deleteProduct, getAllProducts, getProductById, getTopProducts, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'
import {checkObjectId} from '../middleware/checkObjectId.js'
const router = express.Router();

router.get("/top", getTopProducts)
router.get("/", getAllProducts)
router.get("/:id",checkObjectId, getProductById)
router.post("/", protect, admin, createProduct)
router.put("/:id", protect, admin,checkObjectId, updateProduct)
router.delete("/:id", protect, admin,checkObjectId, deleteProduct)
router.post("/:id/reviews", protect, createProductReview)


export default router