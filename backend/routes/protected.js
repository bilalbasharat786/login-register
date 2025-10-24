// express ka Router import kiya
import express from 'express';

// jsonwebtoken import kiya (token verify karne ke liye)
import jwt from 'jsonwebtoken';

// User model import kiya (user data fetch karne ke liye)
import User from '../models/User.js';

// router banaya
const router = express.Router();


// Middleware: yeh check karega ke request ke saath token hai ya nahi
const authMiddleware = (req, res, next) => {
  // frontend se header me token aata hai ("Authorization": "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer ke baad ka token nikal liya

  if (!token) {
    // agar token missing hai to error bhej do
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // token verify karte hain secret key ke saath
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // user ka id request object me daal dete hain taki aage use kar saken
    req.user = decoded.id;
    next(); // next middleware ya route par chala jata hai
  } catch (error) {
    // agar token galat hai ya expire ho gaya to error bhej do
    res.status(401).json({ message: 'Invalid token' });
  }
};


// ====================== Protected Route Example ======================
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user me login user ka id hoga (authMiddleware ne daala tha)
    const user = await User.findById(req.user).select('-password'); 
    // "-password" ka matlab hai password field hata do response se

    // user ka data bhej dete hain
    res.json(user);
  } catch (error) {
    // agar koi error aaye to server error bhejo
    res.status(500).json({ message: 'Server error' });
  }
});

// router export kar diya
export default router;

