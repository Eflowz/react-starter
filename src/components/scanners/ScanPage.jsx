import { useTheme } from '../../Context/ThemeContext';



export default function ScanPage() {

      const { theme, toggleTheme } = useTheme(); 
    
  return (
    <div>
        <h1 className={`text-4xl font-bold text-center ${
        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
              }`}>Scan QR Code</h1>
        <div className="text-center mb-6">
        <p className={`mt-2 ${
        theme === 'light' ? 'text-gray-500' : 'text-gray-300'
              }`}>Point the camera at the  QR code</p>
      </div>
     
   
    </div>
  );
}
