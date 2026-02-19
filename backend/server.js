import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import auth from './middleware/auth.js';
import protectedRoutes from './routes/protected.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
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

