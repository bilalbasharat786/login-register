// express ka Router import kiya (routes banane ke liye)
import express from 'express';

// User model import kiya (jisme user ka schema hai)
import User from '../models/User.js';

// bcryptjs import kiya (password ko hash aur compare karne ke liye)
import bcrypt from 'bcryptjs';

// jsonwebtoken import kiya (user login ke baad token generate karne ke liye)
import jwt from 'jsonwebtoken';

// router banaya jisme hum register aur login ke endpoints likhenge
const router = express.Router();


// ====================== REGISTER ROUTE ======================
router.post('/register', async (req, res) => {
  try {
    // frontend se jo data aaya usme se name, email, password extract kiya
    const { name, email, password } = req.body;

    // check karte hain email already exist karta hai ya nahi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // agar email already hai to error bhej do
      return res.status(400).json({ message: 'Email already exists' });
    }

    // password ko hash karte hain (10 salt rounds ke saath)
    const hashedPassword = await bcrypt.hash(password, 10);

    // ek naya user object create karte hain (hashed password ke saath)
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // user ko database me save kar dete hain
    await newUser.save();

    // success response bhejte hain
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // agar koi error aaye to error response bhejo
    res.status(500).json({ message: 'Server error', error });
  }
});


// ====================== LOGIN ROUTE ======================
router.post('/login', async (req, res) => {
  try {
    // frontend se jo data aaya usme se email aur password extract kiya
    const { email, password } = req.body;

    // database me user dhoondhte hain is email ke saath
    const user = await User.findOne({ email });
    if (!user) {
      // agar user exist nahi karta to error bhej dete hain
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // frontend se aaya hua password aur database me saved hashed password compare karte hain
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // agar password match nahi hua to error bhej do
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // agar user valid hai to ek JWT token generate karte hain
    const token = jwt.sign(
      { id: user._id },            // payload me user ka id rakha
      process.env.JWT_SECRET,      // secret key (jo .env me store hai)
      { expiresIn: '1h' }          // token 1 ghante ke liye valid hoga
    );

    // login successful hone ke baad response bhejte hain
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    // agar koi error aaye to error response bhejo
    res.status(500).json({ message: 'Server error', error });
  }
});

// router ko export kar diya taki server.js me use kar saken
export default router;
