import User from '../models/User.js';

export default async function adminAuth(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied! Only Admins are allowed.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error verifying admin status' });
  }
}