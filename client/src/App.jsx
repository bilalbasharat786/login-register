import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; 
import Dashboard from './pages/Dashboard.jsx'; // Naya Dashboard import kiya
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Security Guard import kiya

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard ko ProtectedRoute ke andar wrap kar diya */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


