import { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';

export default function TodaysAttend() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/records/today');
      const data = await res.json();
      setRecords(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch records:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 10000); 
    return () => clearInterval(interval);
  }, []);

  const formatDayWithDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const fullDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return `${day}, ${fullDate}`;
};

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`max-w-4xl mx-auto mt-10 p-4 rounded-lg shadow transition-colors duration-300
      ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-100'}`}>
      
      <h2 className={`text-2xl font-bold mb-4  ${
        theme === 'light' ? 'text-gray-800' : 'text-gray-100'
      }`}>
        Attendance Records
      </h2>

      {loading ? (
        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-center`}>
          Loading records...
        </p>
      ) : records.length === 0 ? (
        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} text-center`}>
          No records found for today.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead>
              <tr className={`${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-gray-200'}`}>
                <th className="p-3 border">Day of the week</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr
                  key={index}
                  className={`border-b transition-colors duration-200 
                    ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'}`}
                >
                  <td className="p-3 border">{formatDayWithDate(rec.timestamp)}</td>
                  <td className="p-3 border">{rec.fullName}</td>
                  <td className="p-3 border">{formatTime(rec.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
