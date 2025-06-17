import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';


export default function AdminSignin() {
  const { theme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      // if (res.data.isAuthenticated && res.data.role === 'admin') {
      //   navigate('/admin/attendance');
      // } 

    if (res.data.isAuthenticated && res.data.role === 'admin') {
  localStorage.setItem('isAdmin', 'true');
  navigate('/admin/dashboard');
  }else {
        setError('Unauthorized access');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-gray-100 to-slate-200 text-gray-900'
          : 'bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100'
      }`}
    >
      <div
        className={`rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6 ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Sign In</h1>
          <p
            className={`text-sm font-medium mt-1 ${
              theme === 'light' ? 'text-red-600' : 'text-red-400'
            }`}
          >
            🔒 Admin Only
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="UserName"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === 'light'
                  ? 'border-gray-300'
                  : 'border-gray-700 bg-gray-800 text-white'
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              required
              maxLength={20}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                theme === 'light'
                  ? 'border-gray-300'
                  : 'border-gray-700 bg-gray-800 text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
