import UtilizationChart from "./UtilizationChart";
import CapacityChart from "./CapacityChart"; // Import Capacity Chart
import React, { useState, useEffect } from "react";
import "./resourceManagement.css";
import { saveAs } from "file-saver";

const ResourceManagement = () => {
  let Data = JSON.parse(localStorage.getItem("Task_Data"));

  const [resources, setResources] = useState([
    {
      id: Data.task.team.id,
      name: "John Doe",
      role: "Developer",
      status: "Allocated",
    },
    { id: 2, name: "Jane Smith", role: "Designer", status: "Unallocated" },
    { id: 3, name: "Mike Johnson", role: "Tester", status: "Allocated" },
  ]);

  const [userRole, setUserRole] = useState("Admin");

  const team = Data.task.team;
  const person1 = team[0].name;
  const person2 = team[1].name;
  // Sample Utilization Data for the Chart
  const utilizationData = [
    { name: person1, allocatedHours: 35 },
    { name: person2, allocatedHours: 40 },
  ];

  // Sample Capacity vs Allocation Data
  const capacityData = [
    { name: person1, capacity: 40, allocated: 35 },
    { name: person2, capacity: 40, allocated: 40 },
  ];

  const handleAllocate = (id) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === id ? { ...resource, status: "Allocated" } : resource
      )
    );
  };

  const handleEdit = (id) => {
    alert(`Editing resource with ID: ${id}`);
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Role,Status\n" +
      resources
        .map((res) => `${res.id},${res.name},${res.role},${res.status}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "ResourceManagementData.csv");
  };

  return (
    <div className="table-container">
      <h2>Resource Management</h2>
      {/* Table */}
      <table className="my-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            {userRole !== "Employee" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {Data &&
            Array.isArray(Data.task.team) &&
            Data.task.team.map((d, i) => (
              <tr key={i}>
                <td>{d._id}</td>
                <td>{d.name}</td>
                <td>{d.role}</td>
                <td>{d.title}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(resource.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Export to CSV */}
      <button className="export-btn" onClick={exportToCSV}>
        Export to CSV
      </button>
      {/* Utilization Chart */}
      <UtilizationChart data={utilizationData} />
      {/* Capacity vs Allocation Chart */}
      <CapacityChart data={capacityData} />
    </div>
  );
};

export default ResourceManagement;
