import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/StudentService';

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    age: '',
    course: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent(student);
      navigate('/'); // redirect to list after adding
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
      <h4>Add Student</h4>
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

        <button type="submit" className="btn btn-success">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
