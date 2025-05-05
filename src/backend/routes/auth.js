
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const OTP = require('../models/otp');
const sendEmail = require('../utils/email');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate and send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash OTP for storage
    const hashedOTP = await bcrypt.hash(otp, 10);
    
    // Save OTP to database (remove existing OTPs for this email first)
    await OTP.deleteMany({ email });
    await new OTP({ email, otp: hashedOTP }).save();
    
    // Send OTP via email
    await sendEmail(
      email,
      'Your OTP for Foodie App',
      `Your OTP is: ${otp}. It will expire in 5 minutes.`
    );
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find OTP document
    const otpDoc = await OTP.findOne({ email });
    if (!otpDoc) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }
    
    // Verify OTP
    const isValid = await bcrypt.compare(otp, otpDoc.otp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Get user data
    const user = await User.findOne({ email });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Delete the used OTP
    await OTP.deleteOne({ email });
    
    res.status(200).json({ 
      message: 'OTP verified successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login (simplified - just redirects to OTP flow)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'Use OTP to login', name: user.name });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
