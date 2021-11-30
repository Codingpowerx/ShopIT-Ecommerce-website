const express = require('express');

const router = express.Router();

const {processPayment} = require('../controllers/paymentController');
const { isAuthenticatedUser} = require('../middlewares/auth');

router.route('/payment-process/:order').get(isAuthenticatedUser, processPayment);


module.exports = router;