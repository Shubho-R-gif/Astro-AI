import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import ChatopeningUI from "./ChatopeningUI";
import Chatbot from "./Chatbot";
import Footer from "./Components/Footer";
import Privacypolicy from "./Components/Privacypolicy";
import "./App.css";

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideChatUI, setHideChatUI] = useState(false); // Track when to hide ChatopeningUI

  const handleClick = () => {
    setZoomOut(true);
    setLoading(true);

    setTimeout(() => {
      setShowChatbot(true);
      setHideChatUI(true); // Hide ChatopeningUI after transition
    }, 1500);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            !hideChatUI ? (
              <ChatopeningUI
                handleClick={handleClick}
                zoomOut={zoomOut}
                loading={loading}
              />
            ) : null
          }
        />
        <Route
          path="/privacy-policy"
          element={!showChatbot && <Privacypolicy />}
        />
      </Routes>
      {showChatbot && <Chatbot />}
      <Footer />
    </Router>
  );
};

export default App;
