import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ChatopeningUI from "./ChatopeningUI";
import Footer from "./Components/Footer";
import Privacypolicy from "./Components/Privacypolicy"; // Import Privacy Policy page
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatopeningUI />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
