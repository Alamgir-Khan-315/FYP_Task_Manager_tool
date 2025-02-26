import React, { useState } from "react";
import MessageBubble from "./Component/MessageBubble";
import TypingIndicator from "./Component/TypingIndicator";
import InputBox from "./Component/InputBox";

const MessageList = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // ✅ Function to generate dynamic bot replies
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("remotesync")) {
      return "Remotesync is a project management tool that helps track time, manage resources, and monitor activities.";
    } else if (lowerCaseMessage.includes("track my time")) {
      return "To track time, go to the 'Time Tracking' page and start a manual or automatic timer.";
    } else if (lowerCaseMessage.includes("reports")) {
      return "You can view project reports in the 'Reporting' section. Would you like me to show you how?";
    } else if (lowerCaseMessage.includes("help")) {
      return "Sure! You can ask me about features, time tracking, reports, or settings.";
    } else {
      return "I'm not sure about that. Can you rephrase or ask about Remotesync features?";
    }
  };

  const handleSendMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: botResponse, sender: "bot" },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // ✅ Handle Quick Reply Selection
  const handleQuickReply = (text) => {
    handleSendMessage(text);
  };

  // ✅ Function to handle closing chatbot (can be expanded later)
  const handleCloseChat = () => {
    alert("Chatbot closed (Add functionality to hide chatbot here)");
  };

  return (
    <div className="chat-container">
      {/* Chatbot Header */}
      <div className="chat-header">
        <span>🔮 Remotesync Bot</span>
        <button className="close-button" onClick={handleCloseChat}>
          ✖
        </button>
      </div>

      {/* Chat Messages */}
      <div className="message-list">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* ✅ Quick Reply Buttons (Restored) */}
      <div className="quick-replies">
        <button onClick={() => handleQuickReply("What is Remotesync?")}>
          What is Remotesync?
        </button>
        <button onClick={() => handleQuickReply("How do I track my time?")}>
          How do I track my time?
        </button>
        <button onClick={() => handleQuickReply("Show me reports.")}>
          Show me reports.
        </button>
      </div>

      {/* Input Box */}
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
};

export default MessageList;
