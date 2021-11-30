const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Order = require('../models/order')
const catchAsync = require('../middlewares/catchAsync')


exports.processPayment = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}/order`,
    customer_email: req.user.email,
    client_reference_id: req.params.orderId,
    line_items: [
      {
        shippingPrice: order.shippingPrice,
        amount: order.totalPrice * 100,
        currency: 'usd'
      }
    ]
  })


  res.status(200).json({
    status: 'success',
    session
  })
})