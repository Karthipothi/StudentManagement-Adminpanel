import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get student ID from URL
import Select from 'react-select';
const EditUser = () => {
  const booleanOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];
  const { Userid } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_admin: ''
  });

  const [isLoading, setIsLoading] = useState(true); // To show loading state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${Userid}`);
        console.info(response.data.user)
        const user = response.data.user;
        setFormData({
          name: user.name,
          email: user.email,
          phnnbr: user.password,
          course: user.is_admin
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [Userid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'is_admin' ? value === 'true' : value;
  
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/user/${Userid}/edit`, formData);
      console.log('user data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">User Name</label>
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
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="tel"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">is_Admin</label>
            <Select
             options={booleanOptions}
              name="is_admin"
              value={booleanOptions.find(option => option.value === formData.is_admin)} // Pre-select based on formData
              onChange={(selectedOption) =>
                handleInputChange({ target: { name: 'is_admin', value: selectedOption.value } })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
