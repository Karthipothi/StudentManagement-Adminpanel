import { useLocation } from 'react-router-dom';
import Sidebars from './Component/Sidebars';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Student from './Component/Student';
import Teacher from './Component/Teacher';
import User from './Component/User';
import Login from './Component/LoginPage';
import CreateStudent from './Component/Student/CreateStudent';
import EditStudent from './Component/Student/EditStudent';
import CreateTeacher from './Component/Teacher/CreateTeacher';
import EditTeacher from './Component/Teacher/EditTeacher';
import CreateUser from './Component/User/CreateUser';
import EditUser from './Component/User/EditUser';
import NavBar from './Component/NavBar';



function App() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
      
      {location.pathname !== '/login' && (
        <>
          <Sidebars />
          <div className="main-content" style={{ flexGrow: 1, padding: '20px', marginBlock: '100px',marginLeft: '250px' }}>
            <NavBar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Student />} />
              <Route path="/teachers" element={<Teacher />} />
              <Route path="/users" element={<User />} />
              <Route path='/createstudent' element={<CreateStudent/>}></Route>
              <Route path='/editstudent/:Studentid' element={<EditStudent/>}></Route>
              <Route path='/createsteacher' element={<CreateTeacher/>}></Route>
              <Route path='/editteacher/:Teacherid' element={<EditTeacher/>}></Route>
              <Route path='/createsuser'element={<CreateUser/>}></Route>
              <Route path='/edituser/:Userid' element={<EditUser/>}></Route>
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
