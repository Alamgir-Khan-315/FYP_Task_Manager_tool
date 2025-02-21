import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CapacityChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Capacity vs. Allocation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="capacity" fill="#8884d8" name="Capacity (Hours)" />
          <Bar dataKey="allocated" fill="#82ca9d" name="Allocated (Hours)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CapacityChart;
