// .env file se environment variables load karne ke liye dotenv import kiya
import dotenv from 'dotenv';

// Express framework import kiya (API routes aur server banane ke liye use hota hai)
import express from 'express';

// Mongoose import kiya (MongoDB ke saath connect aur models use karne ke liye)
import mongoose from 'mongoose';

// CORS import kiya (frontend aur backend ke alag ports/domain hone par request allow karne ke liye)
import cors from 'cors';

// Auth routes import kiye (register aur login ke liye)
import authRoutes from './routes/auth.js';

// Auth middleware import kiya (protected routes ke liye, jisme token verify hota hai)
import auth from './middleware/auth.js';

// Protected routes import kiye (sirf login hone ke baad access hote hain, jaise /me route)
import protectedRoutes from './routes/protected.js';

// dotenv ko configure kiya taki .env file ke variables ko process.env se access kar saken
dotenv.config();

// Express ka ek application instance banaya
const app = express();

// Middleware: isse backend har request ka JSON body parse karega
// Example: frontend se { "email": "test@test.com" } bheja to req.body me JS object ban jayega
app.use(express.json());

// Middleware: CORS ko enable kar diya (frontend se request aane dega)
// bina iske frontend (React) se backend par request block ho jati
app.use(cors());

// /api/auth ke saare routes (register, login) ko authRoutes handle karega
app.use('/api/auth', authRoutes);

// /api/protected ke saare routes (jaise /me) ko protectedRoutes handle karega
app.use('/api/protected', protectedRoutes);



router.get('/me', auth, (req, res) => {
  res.json({ user: req.user });
});

// Server ka port set kiya, ya to .env se lega ya default 5000
const PORT = process.env.PORT || 5000;

// MongoDB ke saath connection banaya (URI .env se le raha hai)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,       // naya URL parser use karo
  useUnifiedTopology: true     // naya topology engine use karo (stable aur fast)
})
// Agar connection successful ho jaye to ye chalega
.then(()=> {
  console.log('MongoDB connected'); // console pe success message
  // Server ko start kar diya aur backend ab given port par listen karega
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})
// Agar MongoDB connect na ho paye to error catch karke console me dikhayega
.catch(err => {
  console.error('DB connect error', err);
});

