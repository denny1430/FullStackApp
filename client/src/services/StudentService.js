import axios from 'axios';

const API_BASE_URL = 'https://localhost:7174/api/Student'; // change if your backend port is different

// 🔹 GET all students
export const getAllStudents = () => {
  return axios.get(API_BASE_URL);
};

// 🔹 GET a student by ID
export const getStudentById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

// 🔹 POST a new student
export const addStudent = (student) => {
  return axios.post(API_BASE_URL, student);
};

// 🔹 PUT update a student
export const updateStudent = (id, student) => {
  return axios.put(`${API_BASE_URL}/${id}`, student);
};

// 🔹 DELETE a student
export const deleteStudent = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
