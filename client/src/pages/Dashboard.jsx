import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-gray-50 p-6 rounded border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">User Information</h3>
          <p className="text-lg text-gray-700 mb-2"><strong>Name:</strong> {user?.name}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {user?.email}</p>
          <p className="text-lg text-gray-700"><strong>Role:</strong> {user?.role || 'User'}</p>
        </div>
      </div>
    </div>
  );
}