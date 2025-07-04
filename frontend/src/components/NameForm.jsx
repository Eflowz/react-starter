import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

export default function NameForm() {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = {
      fullName,
      timestamp: new Date().toISOString(),
    };

 try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
      if (res.ok) {
        setSuccess(true);
        setFullName('');
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }

    setLoading(false);
  };

  return (
    <div className={`max-w-md mx-auto p-6 rounded-xl shadow mt-10 transition-colors duration-300
      ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-100'}`}>
      
      <h2 className={`text-2xl font-bold mb-4 ${
        theme === 'light' ? 'text-gray-800' : 'text-gray-100'
      }`}>
        Enter Your Full Name
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            focus:ring-blue-500 transition-colors duration-200 
            ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-700 text-white border-gray-600'}`}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>

        {success && (
          <p className="text-green-500 text-center mt-2">
            Submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
