import { useNavigate } from "react-router-dom";

const Forst = () => {

      const navigate = useNavigate();

  return (
     <div className="relative w-full h-screen bg-gradient-to-br from-blue-800 to-indigo-900 flex items-center justify-center text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full opacity-20 blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="z-10 text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to Entra</h1>
        <p className="text-lg text-white/80">Streamline your entry experience</p>
        <button 
              onClick={() => navigate("/scan")}
        className="px-6 py-3 bg-white text-indigo-900 rounded-2xl font-semibold  hover:bg-gray-200 transition cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Forst;
