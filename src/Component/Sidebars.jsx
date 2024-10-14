import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import schoolImg from '../../public/images/School icon.png';
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import './component.css';

const Sidebars = () => {
  const location = useLocation();
  return (
    <div style={{zIndex: '100'}}>
        <Sidebar style={{height: '100vh', backgroundColor: 'darkcyan',position:'fixed'}}>
          <div className='flex justify-center	'>
            <img src={schoolImg} style={{width: '50%', height: '100px', textAlign: 'center'}}></img>
          </div>
            <Menu>
                <MenuItem component={<Link to="/dashboard" className={location.pathname === '/dashboard' ? 'menu-item active' : 'menu-item'} />}>
                  <LuLayoutDashboard/>Dashboard
                 </MenuItem>
                <MenuItem component={<Link to="/students" className={location.pathname === '/students' ? 'menu-item active' : 'menu-item'}/>}>
                <PiStudentFill /> Students</MenuItem>
                <MenuItem component={<Link to="/teachers" className={location.pathname === '/teachers' ? 'menu-item active' : 'menu-item'}/>}> 
                <PiChalkboardTeacherFill />Teachers</MenuItem>
                <MenuItem component={<Link to="/users" className={location.pathname === '/users' ? 'menu-item active' : 'menu-item'}/>}>
                <FaRegUser />Users</MenuItem>
            </Menu>
        </Sidebar>
    </div>
  )
}

export default Sidebars