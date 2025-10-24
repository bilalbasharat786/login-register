// mongoose import karte hain (MongoDB me schema aur model banane ke liye)
import mongoose from 'mongoose';

// User ke liye ek schema banaya jisme user ka structure define hai
const userSchema = new mongoose.Schema({
  // user ka naam (string type, required = true matlab dena zaroori hai)
  name: {
    type: String,
    required: true
  },
  // user ka email (string type, required = true aur unique = true matlab duplicate email allow nahi hoga)
  email: {
    type: String,
    required: true,
    unique: true
  },
  // user ka password (string type, required = true)
  // password ham database me encrypted (hash) form me save karenge
  password: {
    type: String,
    required: true
  }
}, 
// ye timestamps option automatically "createdAt" aur "updatedAt" fields add kar deta hai
{ timestamps: true }
);

// ab schema se ek model banaya jiska naam "User" hai
// mongoose.model('User', schema) ka matlab hai ke database me "users" naam ka collection banega
const User = mongoose.model('User', userSchema);

// is model ko export kar diya taki dusri files me use kar saken (jaise auth.js)
export default User;

