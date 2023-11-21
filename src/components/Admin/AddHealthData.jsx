// src/components/AddHealthData.js
import React, { useState } from "react";
import axios from "axios";

const AddHealthData = () => {
  const [formData, setFormData] = useState({
    SrNo: 0,
    TestCode: "",
    TestProfileName: "",
    PatientFees: 0,
    TestSchedule: "",
    ReportedOn: "",
    Method: "",
    TestStatus: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/healthData", formData)
      .then(response => console.log("Data added successfully:", response.data))
      .catch(error => console.error("Error adding data:", error));
  };

  return (
    <div>
      <h2>Add Health Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Render form fields and handle changes */}
      </form>
    </div>
  );
};

export default AddHealthData;
