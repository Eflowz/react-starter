import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useTheme } from '../../Context/ThemeContext';

export default function Generate() {
  const [uniqueKey, setUniqueKey] = useState(Date.now());
  const { theme } = useTheme();

  const link = "http://localhost:5173/Attendance";

  useEffect(() => {
    const interval = setInterval(() => {
      setUniqueKey(Date.now());
    }, 7200000); // 2 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 p-6 rounded-xl transition-colors duration-300
        ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-100'}`}
    >
      <h2 className="text-xl font-semibold mb-4">
        Scan to Fill Attendance
      </h2>

      <QRCodeCanvas
        key={uniqueKey}
        value={link}
        size={330}
        level="H"
        includeMargin={true}
        bgColor={theme === 'light' ? "#FFFFFF" : "#1F2937"} 
        fgColor={theme === 'light' ? "#000000" : "#F9FAFB"} 
      />
    </div>
  );
}
