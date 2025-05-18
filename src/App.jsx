import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Forst from './components/landing/Forst';
import ScanPage from './components/scanners/ScanPage'
import AdminSignIn from "./components/AdminSignIn";

function App() {
  return (
    <>
      <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Forst />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/sign-in" element={<AdminSignIn />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
