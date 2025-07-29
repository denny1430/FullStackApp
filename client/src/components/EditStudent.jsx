import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/StudentService';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    age: '',
    course: ''
  });

  // Fetch student details by ID on load
  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudentById(id);
        setStudent(response.data);
      } catch (error) {
        console.error('Error loading student:', error);
      }
    };

    loadStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, student);
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h4>Edit Student</h4>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
