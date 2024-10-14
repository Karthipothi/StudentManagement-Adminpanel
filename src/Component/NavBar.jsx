import React, { useState } from 'react';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send the token with the request if needed
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      console.log(response);

      // Check if the logout was successful
      if (response.ok) {
        // If successful, remove the token from localStorage
        localStorage.removeItem('access_token');

        // Optionally, clear other user-related data from localStorage or sessionStorage
        // localStorage.removeItem('user');

        // Redirect to the login page
        window.location.href = '/login';
      } else {
        // Handle failure, maybe show a message
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          {/* K Button */}
          <div className="relative">
            <button style={{ backgroundColor: 'blueviolet', color: 'white' }}
              className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-black dark:text-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              K
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 dark:bg-gray-800">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
