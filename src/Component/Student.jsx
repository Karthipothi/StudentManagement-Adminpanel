import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Student = () => {
  const [data, setData] = useState([]);
  const navigate =useNavigate();

  useEffect( () => {
    async function fetchData() 
    {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/studentsdeails');
        console.log(response);
        setData(response.data.students)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const handleAddStudent = () => {
    navigate("/createstudent");
  };

  const handleEditStudent = (params) => {
    console.info(params);
    const Studentid = params.data.id;
    navigate(`/editstudent/${Studentid}`)
  }

  const handleDeleteStudent = async(params) => {
    console.log(params.data.id);
    try {
      const response = await axios.delete(`http://localhost:8000/api/studentsdeails/${params.data.id}/delete`)
    } catch (error) {
      console.error(error);
    }
  }

  const colDefs =[
    {
      headerName: 'Name',
      field:'name',
      flex: 1
    },
    {
      headerName: 'Date of Birth',
      field:'dob',
      flex: 1
    },
    {
      headerName: 'Email',
      field:'email',
      flex: 1
    },
    {
      headerName: 'Course',
      field:'course',
      flex: 1
    },
    {
      headerName: 'Phone Number',
      field:'phnnbr',
      flex: 1
    },
    {
      headerName : 'Action',
      cellRenderer: (params) => {
        return (
          <div>
            <Button
            style={{ backgroundColor: 'green', color: 'white' }}
              variant="link"
              size="sm"
              className="text-decoration-none me-2"
              onClick={() => handleEditStudent(params)}
            >
              <MdEdit className="text-primary" style={{ width: 20, height: 20 }} />
            </Button>
            <Button
            style={{ backgroundColor: 'red', color: 'white' }}
              variant="link"
              size="sm"
              className="text-decoration-none"
              onClick={() => handleDeleteStudent(params)}
            >
              <MdDelete className="text-danger" style={{ width: 20, height: 20 }} />
            </Button>
          </div>
        )
      }
    }
  ]

  return (
   <div>
    <div className='flex justify-between'>
      <p>Students</p>
      <Button  style={{ backgroundColor: 'blue', color: 'white' }}   size='sm' className="text-decoration-none  "   onClick={handleAddStudent}>Add Student</Button>
    </div>
    <div
     className="ag-theme-quartz" // applying the Data Grid theme
     style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={data}
          columnDefs={colDefs}
      />
    </div>
   </div>
   )
}

export default Student