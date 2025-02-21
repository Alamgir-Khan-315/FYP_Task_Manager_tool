import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const UtilizationChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Resource Utilization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="allocatedHours" fill="#6a1b9a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UtilizationChart;
