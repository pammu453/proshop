import express from 'express'
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUserById,
    getUsers,
    deleteUser,
    updateUser,
} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//NORMAL USER
router.post("/login", authUser)
router.post("/", registerUser)
router.post("/logout", logoutUser)
router.get("/profile",protect, getUserProfile)
router.put("/profile",protect, updateUserProfile)

//ADMIN ROUTES
router.get("/:id",protect,admin, getUserById)
router.get("/",protect,admin, getUsers)
router.delete("/:id",protect,admin, deleteUser)
router.put("/:id",protect,admin, updateUser)

export default router