import { useTheme } from '../../Context/ThemeContext';
import Generate from './Generate';

export default function ScanPage() {
  const { theme } = useTheme();

  return (
    <div className="p-6">
      <h1 className={`text-5xl font-bold text-center mb-4 ${
        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
      }`}>
        Scan QR Code
      </h1>

      <div className="text-center mb-6">
        <p className={`mt-2 text-2xl sm:text-xl ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-300'
        }`}>
          Point the camera at the QR code
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around  md:gap-2 mt-12">
        <div className="text-left md:w-[700px]">
          <h2 className={`md:text-7xl  text-3xl sm:text-xl  font-semibold mb-2 ${
            theme === 'light' ? 'text-gray-800' : 'text-gray-200'
          }`}>
            Quick & Secure Check-In
          </h2>
          <p className={`w-[300px] sm:w-[600px] md:w-[400px] text-center  ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Scan the QR code using your camera to log your attendance or register your visit instantly. No contact. No hassle.
          </p>
        </div>

      <div
        className={`md:w-[500px] h-[400px] flex items-center justify-center border rounded-lg  shadow sm:mt-8 transition-colors duration-300 md:p-4 mt-4
          ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-100'}`}
      >
            <Generate/>
        </div>
      </div>
    </div>
  );
}
