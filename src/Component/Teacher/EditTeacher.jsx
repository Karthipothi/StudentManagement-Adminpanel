import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get student ID from URL

const EditTeacher = () => {
  const { Teacherid } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phnnbr: '',
    course: ''
  });

  const [isLoading, setIsLoading] = useState(true); // To show loading state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/teacherdetails/${Teacherid}`);
        console.info(response.data.teacher)
        const teacher = response.data.teacher;
        setFormData({
          name: teacher.name,
          dob: teacher.dob,
          email: teacher.email,
          phnnbr: teacher.phnnbr,
          course: teacher.course
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [Teacherid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/teacherdetails/${Teacherid}/edit`, formData);
      console.log('Teacher data updated successfully');
    } catch (error) {
      console.error('Error updating teacher data:', error);
    }
  };

  if (isLoading) {
    return <p>Loading teacher data...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Teacher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Teacher Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
         
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phnnbr"
              value={formData.phnnbr}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
