import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useTheme } from "../../Context/ThemeContext";
import {
  FaCube, FaPencilAlt, FaLightbulb, FaMobileAlt, FaGlobe,
  FaCog, FaTh, FaPlus, FaPaperPlane, FaUser
} from "react-icons/fa";
import gsap from 'gsap';


import pic1 from '../../assets/images/blur_colors1.jpg';
import pic2 from '../../assets/images/blarred.jpg';
import pic3 from '../../assets/images/blur_wallpaper.jpg';
import pic4 from '../../assets/images/Thelas.jpg';

const IconSquare = ({ icon: Icon, bgColor = "bg-stone-400", size = "text-2xl", positionClass = "", extraClass = "" }) => (
  <div
    className={`absolute w-12 h-12 flex items-center justify-center rounded-lg shadow-sm ${bgColor} bg-opacity-70 backdrop-blur-sm tilt-slow ${positionClass} ${extraClass}`}
    style={{ transform: `rotate(${Math.random() * 30 - 10}deg)` }}
  >
    <Icon className={`${size} text-gray-800 dark:text-gray-100 animate-pulse`} />
  </div>
);

const FloatingCard = ({ type, title, imageSrc, positionClass, className = "" }) => (
  <div
    className={`absolute ${positionClass} md:w-72 w-[160px] p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-start space-y-2 ${className}`}
    style={{ transform: `rotate(${Math.random() * 10 - 8}deg)` }}
  >
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
      <div className="w-2 h-2 rounded-full bg-green-400" />
      <span className="font-semibold text-gray-800 dark:text-white">{type}</span>
    </div>
    <h3 className="text-sm md:text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
    {imageSrc && <img src={imageSrc} alt={type} className="rounded-md md:w-[100px] w-[80px] h-auto mt-2" />}
  </div>
);

const iconData = [
  { icon: FaCube, position: "top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2", mobile: true },
  { icon: FaPencilAlt, position: "top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2", mobile: true },
  { icon: FaLightbulb, position: "bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2", mobile: true },
  { icon: FaMobileAlt, position: "bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2", mobile: true },
  { icon: FaGlobe, position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", mobile: true },
  { icon: FaCog, position: "top-10 left-1/2 -translate-x-1/2", mobile: false },
  { icon: FaTh, position: "top-1/4 right-10", mobile: false },
  { icon: FaPlus, position: "bottom-1/4 left-10", mobile: false },
  { icon: FaPaperPlane, position: "top-10 left-10", mobile: false },
  { icon: FaUser, position: "bottom-10 right-10", mobile: false },
];

const Forst = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const textRef = useRef(null);
  
  useEffect(() => {
    const letters = textRef.current.querySelectorAll('span');

    gsap.fromTo(
      letters,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        color: '#ffffff',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.5,
      }
    );
  }, []);


  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      
      {/* Background Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute top-0 right-[500px] w-96 h-96 bg-yellow-300 rounded-full opacity-30 blur-2xl translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400 rounded-full opacity-40 blur-3xl -translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-400 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-400 rounded-full opacity-30 blur-3xl"></div>

      {/* Floating Cards */}
      <FloatingCard type="Scan to Login" title="Sign In!" imageSrc={pic1} positionClass="top-20 left-4" className="sm:hidden" />
      <FloatingCard type="Easiest Attendance" title="Login!!" imageSrc={pic2} positionClass="bottom-20 right-4" className="sm:hidden" />
      {/* Desktop */}
      <FloatingCard type="Scan to Login" title="Sign In!" imageSrc={pic1} positionClass="top-20 left-20" className="hidden sm:flex" />
      <FloatingCard type="Landing" title="Carousel" imageSrc={pic2} positionClass="top-20 right-20" className="hidden sm:flex" />
      <FloatingCard type="Dashboard" title="Filter & Sorting" imageSrc={pic3} positionClass="bottom-20 left-20" className="hidden sm:flex" />
      <FloatingCard type="Sign Up" title="Navbar" imageSrc={pic4} positionClass="bottom-20 right-20" className="hidden sm:flex" />

      {/* Icons */}
      {iconData.map(({ icon, position, mobile }, i) => (
        <IconSquare
          key={i}
          icon={icon}
          positionClass={`${position} ${mobile ? 'block' : 'hidden md:block'}`}
          extraClass="float-around"
        />
      ))}

      <div className="z-10 text-center space-y-6 max-w-2xl px-4">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full dark:bg-green-900 dark:text-green-200">
            A better way to Sign in
          </span>
        </div>

 <h1
          ref={textRef}
        className={`text-6xl md:text-7xl font-bold font-serif mb-12 transition-colors duration-500 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      style={{
    textShadow: theme === 'dark' ? '0 0 15px rgba(0, 255, 209, 0.6)' : 'none',
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
  }}
      >
        GateMark
      </h1>
        <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        >
          Streamline your entry experience with a World-class entry system
        </p>

        <button
          onClick={() => navigate("/scan")}
          className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition cursor-pointer"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Forst;
