// src/components/HealthDataList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const HealthDataList = () => {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/healthData")
      .then(response => setHealthData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Health Data List</h2>
      <ul>
        {healthData.map(data => (
          <li key={data._id}>
            {data.TestProfileName} - {data.PatientFees}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthDataList;
