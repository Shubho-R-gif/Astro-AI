import { useState } from "react";
import Chatbot from "./Chatbot";
import "./ChatopeningUI.css";

const ChatUI = () => {
  const [zoomOut, setZoomOut] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setZoomOut(true);
    setLoading(true); // Show loading state

    // Wait for transition (1.5s) before showing the Chatbot
    setTimeout(() => {
      setShowChatbot(true);
      setLoading(false); // Stop loading after transition
    }, 1500);
  };

  return (
    <>
      {!showChatbot ? (
        <div
          className="chatOpeningContainer"
          style={{
            transition: "transform 1.5s ease, opacity 1.5s ease-in-out",
            transform: zoomOut ? "scale(1.5)" : "scale(1)",
            opacity: zoomOut ? 0 : 1,
          }}
          aria-live="polite"
        >
          <h1 className="heading">What can I help you with today?</h1>
          <h3 className="sub-heading">Your AI-Powered Assistant</h3>
          <button
            type="button"
            className="cta"
            onClick={handleClick}
            disabled={loading}
          >
            <span>
              {loading ? "Loading..." : "Chat with "}
              <span className="highlightname">Astro AI</span>
            </span>
          </button>
        </div>
      ) : (
        <Chatbot />
      )}
    </>
  );
};

export default ChatUI;
