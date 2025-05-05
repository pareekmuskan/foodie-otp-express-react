
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/order');

// Process payment (mock)
router.post('/process', auth, async (req, res) => {
  try {
    const { amount, items } = req.body;
    
    // In a real app, this would integrate with a payment gateway
    // For now, we'll simulate a successful payment
    
    // Create order record
    const order = new Order({
      user: req.user.userId,
      items,
      totalAmount: amount,
      status: 'confirmed'
    });
    
    await order.save();
    
    res.status(200).json({
      success: true,
      orderId: order._id,
      message: 'Payment successful'
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
});

module.exports = router;
