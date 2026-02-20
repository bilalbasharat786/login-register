import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

dotenv.config();
const app = express();

app.use(helmet());

app.use(express.json());
app.use(cors());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Bohat zyada requests aa rahi hain. Bara-e-meharbani 15 minute baad try karein.' }
});

app.get('/', (req, res) => {
  res.send('Mera Backend Vercel Par Successfully Chal Raha Hai! 🚀');
});

// 👇 authLimiter ko sirf auth routes (login/register) par apply kiya hai 👇
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('DB connect error', err);
});

export default app;