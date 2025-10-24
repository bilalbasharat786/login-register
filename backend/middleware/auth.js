// jsonwebtoken import kiya (yeh JWT tokens ko sign aur verify karne ke liye use hota hai)
import jwt from 'jsonwebtoken';

// auth middleware function export kiya jo request ko authenticate karega
export default function auth(req, res, next) {
  
  // frontend jab request bhejta hai to token `Authorization` header me hota hai
  // yaha se us header ko extract kiya
  const authHeader = req.headers.authorization;

  // agar token missing hai ya "Bearer " ke sath start nahi ho raha
  // to error return kar diya (401 = Unauthorized)
  if(!authHeader || !authHeader.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'No token' });

  // agar header sahi hai to "Bearer <token>" string me se sirf token nikal liya
  const token = authHeader.split(' ')[1];

  try {
    // token ko verify karte hain using secret key (process.env.JWT_SECRET se lete hain)
    // agar token valid hai to decoded object me user ki info milti hai (jaise id)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded user info ko request object me daal diya
    // taki aage ke routes me req.user se access ho jaye
    req.user = decoded; 

    // next() call kiya -> iska matlab ab next middleware ya route handler execute hoga
    next();

  } catch (err) {
    // agar token invalid hai ya expire ho gaya hai to error return karte hain
    return res.status(401).json({ message: 'Invalid token' });
  }
}

