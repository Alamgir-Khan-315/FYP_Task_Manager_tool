import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is RemoteSync?",
      answer: "RemoteSync is a project management tool.",
    },
    {
      question: "How do I reset my password?",
      answer: "Go to settings and click reset password.",
    },
    {
      question: "Can I integrate third-party apps?",
      answer: "Yes, integrations are available in settings.",
    },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.question}
          </div>
          <div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={
              openIndex === index
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.4 }}
          >
            {openIndex === index && <p>{item.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
