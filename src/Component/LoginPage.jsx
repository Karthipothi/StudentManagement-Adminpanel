import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setErrorMessage] = useState();

  useEffect( () => {
    console.info('Login Page');
    console.log(formData);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,  // Keep previous data
      [name]: value, // Update the specific field that changed
    });
  };

 
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: formData.email,
        password: formData.password
      });
      
      // Handle successful login (e.g., store token, redirect)
      console.log('Login successful:', response.data);
      // Example: store token in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      window.location.href = '/dashboard'; // or use navigate if using useNavigate hook

    } catch (error) {
      // Handle error (e.g., wrong credentials)
      setErrorMessage('Login failed. Please check your email and password.');
      console.error('Login error:', error);
    }
  };


  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
