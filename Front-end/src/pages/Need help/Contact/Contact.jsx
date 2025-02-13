import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="contact-container"
      initial={{ opacity: 0, y: -20 }} // Fade in with slide-down effect
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Contact Support
      </h2>

      {submitted ? (
        <p
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          ✅ Thank you! Your message has been sent.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }} // Small zoom effect on focus
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
          />

          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.05 }}
          />

          <button
            type="submit"
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            transition={{ duration: 0.2 }}
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
