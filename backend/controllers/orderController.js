const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middlewares/catchAsync');

exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    ItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    } = req.body;
    
    const order = await Order.create({
        orderItems,
        shippingInfo,
        ItemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order
    })

});


exports.getSingleOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
        return next(new ErrorHandler('No order found with that ID', 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})


exports.myOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})

exports.allOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})



async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save();
}


exports.updateOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.property)
    })

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    })
})



exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('No order found with that ID', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true
    })
})



