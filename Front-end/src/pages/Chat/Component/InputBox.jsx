import React, { useState } from "react";

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="input-box">
      {/* Message Input Field */}
      <input
        type="text"
        className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Send Button with Text & Icon */}
      <button className="send-button" onClick={handleSend}>
        <i className="fas fa-paper-plane"></i> Send
      </button>
    </div>
  );
};

export default InputBox;
