
import './App.css';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Screens/HomePage';
import UserCreateForm from './Screens/User/UserCreate';
import UserLoginForm from './Screens/User/UserLogin';
import ManagerCreateForm from './Screens/Manager/ManagerCreate';
import ManagerLoginForm from './Screens/Manager/ManagerLogin';
import AdminLoginForm from './Screens/Admin/AdminLogin';
import AdminPage from './Screens/Admin/AdminPage';
import Ahandler from './Ahandler';


function App() {
  const [isAdminAuthincated,setisAdminAuthincated]=useState();
  const PrivateAroute=({element})=>{
    return isAdminAuthincated? element:<Navigate to='/'/>
  }
  return (
    <>
    <Router>
    <Ahandler setisAdminAuthincated={setisAdminAuthincated}/>
    <Routes>
      <Route exact path="/" element={<HomePage/>} />      
      <Route exact path="/adminlogin" element={<AdminLoginForm/>} />
      <Route exact path="/adminpage" element={<PrivateAroute element={<AdminPage/>}/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
