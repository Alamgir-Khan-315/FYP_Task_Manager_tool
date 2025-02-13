import React from "react";
import "./User_guaid.css";

const UserGuide = () => {
  const guides = [
    {
      title: "Getting Started",
      content:
        "Learn how to create an account, set up projects, and invite team members.",
    },
    {
      title: "Managing Projects",
      content:
        "Discover how to create, update, and track projects efficiently.",
    },
    {
      title: "Time Tracking",
      content:
        "Use the time tracking feature to monitor work hours and productivity.",
    },
    {
      title: "Generating Reports",
      content:
        "Learn how to generate reports on project progress, time logs, and more.",
    },
  ];

  return (
    <div
      className="user-guide-container"
      initial={{ opacity: 0, y: -20 }} // Fade-in with slight downward motion
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        User Guide
      </h2>

      <div className="guide-list">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="guide-item"
            initial={{ opacity: 0, x: -30 }} // Slide-in from left
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }} // Staggered animation
          >
            <h3>{guide.title}</h3>
            <p>{guide.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGuide;
