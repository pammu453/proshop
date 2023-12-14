import express from 'express'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliverd,
    getAllOrders
} from '../controllers/orderController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//NORMAL USER
router.post("/", protect,addOrderItems)
router.get("/myorders",protect, getMyOrders)
router.put("/:id/pay",protect, updateOrderToPaid)

//ADMIN ROUTES
router.get("/:id",protect,admin, getOrderById)
router.put("/:id/deliver",protect,admin, updateOrderToDeliverd)
router.get("/",protect,admin, getAllOrders)

export default router