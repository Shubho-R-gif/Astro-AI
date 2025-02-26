import "regenerator-runtime/runtime"; // Important: Ensure this is the first import
import { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faCopy,
  faCheck,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import "./Chatbot.css";

const Chatbot = () => {
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [userInputText, setUserInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(false);
  const [opacity, setOpacity] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const autoScroll = useRef(null);

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollTop = autoScroll.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    setUserInputText(transcript);
  }, [transcript]);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const handleSendBtn = async () => {
    if (userInputText.trim() === "") return;

    const newMessages = { text: userInputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessages]);
    setUserInputText("");

    // Show typing indicator
    const typingMessage = { text: "Typing...", sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, typingMessage]);
    setOpacity(false);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: userInputText }] }],
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      
      const rawText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      const botReply =
        rawText
          .replace(/\*\*/g, "") // Remove bold (**)
          .replace(/\*/g, "") // Remove italics (*)
          .replace(/\n+/g, "\n") // Ensure proper single line breaks
          .replace(/(?<![0-9]):\s*\n/g, ":\n• ") // Add bullet points only after colons that are NOT after a number
          .replace(/'''/g, "") // Remove triple single quotes
          .replace(/\. (?=[A-Z])/g, ".\n") // Add line break after a period IF followed by an uppercase letter (prevents breaking decimal numbers)
          .trim() || "Sorry, I couldn't understand that.";

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove typing indicator
        { text: botReply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove typing indicator
        { text: "Error getting response!", sender: "bot" },
      ]);
    }
  };
  const handleInputClick = (e) => {
    setUserInputText(e.target.value);
  };
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index); // Set the copied message index
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000);
  };

  const handleMicBtn = () => {
    if (!isActive) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
    if (!browserSupportsSpeechRecognition) {
      return <p>Your browser does not support speech recognition.</p>;
    }
    setIsActive(!isActive);
  };
  return (
    <>
      <h1
        className="chatbot-heading"
        style={{ opacity: opacity ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        Let the conversation begin!
      </h1>
      <div className="chat-container">
        <div className="chatBox" ref={autoScroll}>
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <span className={msg.sender === "user" ? "userText" : "botText"}>
                {msg.text}
                {msg.sender === "bot" && (
                  <FontAwesomeIcon
                    icon={copiedIndex === index ? faCheck : faCopy}
                    className="copy"
                    onClick={() => handleCopy(msg.text, index)}
                    onTouchStart={() => handleCopy(msg.text, index)}
                  />
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="text-container">
          <input
            type="text"
            placeholder="Type here to explore..."
            value={userInputText}
            onChange={handleInputClick}
          />
          <FontAwesomeIcon
            icon={faMicrophone}
            className="mic-btn"
            style={{ color: isActive ? "black" : "white" }}
            onClick={handleMicBtn}
          />
          <button type="button" id="send" onClick={handleSendBtn}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
