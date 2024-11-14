import React from 'react'
import Navbar from '../Components/Navbar'
import {Link,useNavigate} from 'react-router-dom'
import ManagerCreateForm from './Manager/ManagerCreate';
import ManagerLoginForm from './Manager/ManagerLogin';

export default function HomePage() {
    const navigate = useNavigate();
    const navtoadminlogin=()=>{navigate("/adminlogin");}
    const navtomanagerlogin=()=>{navigate("/managerlogin");}
    const navtouserlogin=()=>{navigate("/userlogin");}

    
  return (
    <>
    <Navbar/>
    <div>HomePage</div>
    <button onClick={navtouserlogin}>User</button>
    <button onClick={navtomanagerlogin}>Manager</button>
    <button onClick={navtoadminlogin}>Admin</button>
    <Link>SignUp</Link>
    </>
  )
}
