import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';

const router = express.Router();
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin-data', auth, adminAuth, (req, res) => {
  res.json({ message: 'Welcome Admin! Yeh secret data sirf aap dekh sakte hain.' });
});

export default router;