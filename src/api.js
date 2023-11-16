import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const fetchData = () => {
  return axios.get(`${BASE_URL}/healthapi`);
};

export const createData = (data) => {
  return axios.post(`${BASE_URL}/healthapi`, data);
};

export const updateData = (id, data) => {
  return axios.put(`${BASE_URL}/healthapi/${id}`, data);
};

export const deleteData = (id) => {
  return axios.delete(`${BASE_URL}/healthapi/${id}`);
};
