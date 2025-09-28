import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const router = express.Router();


// Register
router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });


const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email already in use' });


const hashed = await bcrypt.hash(password, 10);
const user = new User({ name, email, password: hashed });
await user.save();


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });


const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


export default router;