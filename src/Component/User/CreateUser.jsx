import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';

const CreateUser = () => {
  const booleanOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_admin: false, // Boolean field should default to false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'is_admin' ? value === 'true' : value;
    setFormData({
      ...formData, // Keep previous data
      [name]: value // Update the specific field that changed
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
        const response = await axios.post('http://localhost:8000/api/user', formData);
        console.info(response.data);
    } catch(error) {
        console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
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
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
