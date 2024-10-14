import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [data,setData]=useState([]);
  const navigate =useNavigate();




useEffect(()=>{
  async function fetchData()
  {
    try{
      const response=await axios.get('http://127.0.0.1:8000/api/user');
      console.log(response);
      setData(response.data.user);
    }
    catch (error) {
      console.error(error);
  }
}  fetchData();
},[]);

const handleAddUser = () => {
  navigate("/createsuser");
};
const handleEditUser = (params) => {
  console.info(params);
  const Userid = params.data.id;
  navigate(`/edituser/${Userid}`)
}
const handleDeleteUser = async(params) => {
  console.log(params.data.id);
  try {
    const response = await axios.delete(`http://localhost:8000/api/user/${params.data.id}/delete`)
  } catch (error) {
    console.error(error);
  }
}
const colDefs=[
  {
    headerName: 'Name',
    field:'name',
    flex:1
  },
 
  {
    headerName: 'Email',
    field:'email',
    flex:1
  },
  {
    headerName: 'Password',
    field:'password',
    flex:1
  },
  {
    headerName: 'isAdmin',
    field:'is_admin',
    flex:1
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
               onClick={() => handleEditUser(params)}
            >
              <MdEdit className="text-primary" style={{ width: 20, height: 20 }} />
            </Button>
            <Button
             style={{ backgroundColor: 'red', color: 'white' }}
              variant="link"
              size="sm"
              className="text-decoration-none"
                onClick={() => handleDeleteUser(params)}
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
      <p>User</p>
      <Button style={{ backgroundColor: 'blue', color: 'white' }}  size='sm' className="text-decoration-none" onClick={handleAddUser}>Add User</Button>
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

export default User