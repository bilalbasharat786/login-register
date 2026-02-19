import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js'; // Middleware import kiya

const router = express.Router();

// auth middleware check karega token valid hai ya nahi
router.get('/me', auth, async (req, res) => {
  try {
    // req.user.id aye ga kyunke middleware mein decoded info req.user mein save hui hai
    const user = await User.findById(req.user.id).select('-password'); 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;