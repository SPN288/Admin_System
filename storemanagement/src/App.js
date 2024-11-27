
import './App.css';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Screens/HomePage';
import UserCreateForm from './Screens/User/UserCreate';
import UserLoginForm from './Screens/User/UserLogin';
import UserPage from './Screens/User/UserPage';
import ManagerPage from './Screens/Manager/ManagerPage';
import ManagerLoginForm from './Screens/Manager/ManagerLogin';
import AdminLoginForm from './Screens/Admin/AdminLogin';
import AdminPage from './Screens/Admin/AdminPage';
import Ahandler from './Ahandler';
import Mhandler from './Mhandler';
import Uhandler from './Uhandler';
import ManageProductsManage from './Screens/Products/ManageProductsManage';


function App() {
  const [isAdminAuthincated,setisAdminAuthincated]=useState();
  const PrivateAroute=({element})=>{
    return isAdminAuthincated? element:<Navigate to='/'/>
  }
  const [isManagerAuthincated,setisManagerAuthincated]=useState();
  const PrivateMAroute=({element})=>{
    return isManagerAuthincated? element:<Navigate to='/'/>
  }
  const [isUserAuthincated,setisUserAuthincated]=useState();
  const PrivateUAroute=({element})=>{
    return isUserAuthincated? element:<Navigate to='/'/>
  }
  return (
    <>
    <Router>
    <Ahandler setisAdminAuthincated={setisAdminAuthincated}/>
    <Mhandler setisManagerAuthincated={setisManagerAuthincated}/>
    <Uhandler setisUserAuthincated={setisUserAuthincated}/>
    <Routes>
      <Route exact path="/" element={<HomePage/>} />      
      {/* <Route exact path="/adminlogin" element={<AdminLoginForm/>} /> */}
      {/* <Route exact path="/product"  element={<ManageProductsManage/>} /> */}
      <Route exact path="/product"  element={<PrivateAroute element={<ManageProductsManage/>}/>} />
      <Route exact path="/adminpage" element={<PrivateAroute element={<AdminPage/>}/>} />
      <Route exact path='/managerlogin' element={<ManagerLoginForm/>}/>
      <Route exact path='/managerpage' element={<PrivateMAroute element={<ManagerPage/>}/>}/>
      <Route exact path='/userlogin' element={<UserLoginForm/>}/>
      <Route exact path='/usercreate' element={<UserCreateForm/>}/>
      <Route exact path='/userpage' element={<PrivateUAroute element={<UserPage/>}/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
