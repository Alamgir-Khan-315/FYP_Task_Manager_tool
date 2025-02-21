import React, { useState } from "react";
import "./ProjectCompletionReport.css";

const Report = () => {
  let Data = JSON.parse(localStorage.getItem("Task_Data"));
  return (
    <div>
      <div className="report-container">
        <h2>Project Completion Report</h2>

        <div className="report-section">
          <strong>Project Name:</strong> <span>{Data.task.title}</span>
        </div>
        <div className="report-section">
          <strong>Assigned To:</strong>{" "}
          <span>
            {Data &&
              Array.isArray(Data.task.team) &&
              Data.task.team.map((d, i) => <div key={i}>{d.name}</div>)}
          </span>
        </div>
        <div className="report-section">
          <strong>Description:</strong>{" "}
          <p className="w-[80%] text-justify">{Data.task.description}</p>
        </div>
        <div className="report-section">
          <strong>Issue Date:</strong> <span>{Data.task.updatedAt}</span>
        </div>
        <div className="report-section">
          <strong>Completion Date:</strong> <span>{Data.task.date}</span>
        </div>
        <div className="report-section">
          <strong>Time Spent:</strong> <span>120 Hours</span>
        </div>
        <div className="report-section">
          <strong>Issues:</strong> <p>No major issues encountered.</p>
        </div>
        <div className="report-section">
          <strong>Final Document:</strong>{" "}
          <a href="/path-to-file.pdf" download="Project_Completion_Report.pdf">
            Download Report
          </a>
        </div>
        <div className="report-section">
          <strong>Comments:</strong> <p>Great job on completing the project!</p>
        </div>
        <div className="report-section">
          <strong>Approval by Admin:</strong> <span>Approved</span>
        </div>

        <div className="report-actions">
          <button
            className="resource-btn"
            onClick={() => (window.location.href = "/resource-management")}
          >
            Manage Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
