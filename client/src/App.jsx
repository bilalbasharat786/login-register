import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx'; 

const Dashboard = () => <h2 className="text-2xl text-center mt-10">Welcome to Protected Dashboard!</h2>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route add kiya jo Login par bhej dega */}
          <Route path="/" element={<Navigate to="/login" />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


