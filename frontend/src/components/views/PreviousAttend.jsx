import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../Context/ThemeContext'; 

const PreviousAttend = () => {
  const [startDate, setStartDate] = useState(getCurrentWeekStart());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  function getCurrentWeekStart() {
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - dayOfWeek);
    sunday.setHours(0, 0, 0, 0);
    return sunday.toISOString().split('T')[0]; 
  }

  useEffect(() => {
    const fetchWeekData = async () => {
      setLoading(true);
      try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendance/week?weekStart=${startDate}`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching weekly data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeekData();
  }, [startDate]);

  return (
    <div
      className={`p-4 max-w-4xl mx-auto rounded-lg shadow transition-colors duration-300
      ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-gray-100'}`}
    >
      <h2 className="text-2xl font-bold mb-4">Weekly Attendance</h2>

      <label className="block mb-4">
        <span className="font-medium">Select Week Start Date:</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={`mt-1 block w-full md:w-auto border rounded p-2
            ${theme === 'light' 
              ? 'bg-white border-gray-300 text-gray-900' 
              : 'bg-gray-800 border-gray-600 text-gray-100'}`}
        />
      </label>

      {loading ? (
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading...</p>
      ) : data ? (
        <>
          <h3 className="text-lg font-semibold mt-6">Week: {data.week}</h3>
          <p className="mb-4">Total Sign-ins: {data.totalSignIns}</p>

          {data.days && data.days.length > 0 ? (
            data.days.map((day) => (
              <div
                key={day.date}
                className={`mb-6 pb-2 border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}
              >
                <h4 className="font-semibold">
                  {day.day} ({day.date}) - {day.count} sign-ins
                </h4>
                <ul className="list-disc ml-5">
                  {day.entries.map((entry, idx) => (
                    <li key={idx}>{entry.name} at {entry.time}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="italic text-sm text-gray-500 dark:text-gray-400">
              No attendance data for this week.
            </p>
          )}
        </>
      ) : (
        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          No data available.
        </p>
      )}
    </div>
  );
};

export default PreviousAttend;
