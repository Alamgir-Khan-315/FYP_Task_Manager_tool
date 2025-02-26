import React from "react";

const MessageBubble = ({ text, sender }) => {
  return (
    <div className={`message-bubble ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default MessageBubble;
