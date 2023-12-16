import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items!")
    } else {
        const order = await new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }).save()

        res.status(201).json(order)
    }
})

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json(orders)
})

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update order to paid")
})

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', "name email")
    if (order) {
        res.status(200).json(order)
    } else {
        req.status(404)
        throw new Error("Order not found!")
    }
})

//@desc Update order to deliver
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    res.send("Update order to deliverd")
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send("Get all orders")
})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliverd,
    getAllOrders
}