import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

const Dashboard = () => {
  const [data, setData] = useState([]);



  useEffect(()=>
  {
    async function fetchData()
    {
      try{
         const response=await axios.get('http://127.0.0.1:8000/api/dashboardcards');
         console.log(response);
         setData(response.data);
      }catch(error){
        console.error(error);
      }
    }fetchData();
  },[]);
  return (
    <div>
    <h1>Dashboard</h1>

    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
    <div className="p-4 bg-blue-400">
        <PiStudentFill className="h-12 w-12 text-white" /> {/* Use the icon here */}
      </div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Total Student</h3>
            <p class="text-3xl">{data.totalStudent}</p>
        </div>
    </div>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
    <div className="p-4 bg-blue-400">
         <PiChalkboardTeacherFill className="h-12 w-12 text-white" /> {/* Use the icon here */}
      </div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Total Teacher</h3>
            <p class="text-3xl">{data.totalTeacher}</p>
        </div>
    </div>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
    <div className="p-4 bg-blue-400">
         <FaRegUser className="h-12 w-12 text-white" /> {/* Use the icon here */}
      </div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Total User</h3>
            <p class="text-3xl">{data.totalUser}</p>
        </div>
    </div>
   
</div>
    </div>

    
  )
}

export default Dashboard