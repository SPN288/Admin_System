import React from 'react'
import Navbar from '../Components/Navbar'
import {Link,useNavigate} from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();
    const navtoadminlogin=()=>{navigate("/adminlogin");}
  return (
    <>
    <Navbar/>
    <div>HomePage</div>
    <button>User</button>
    <button>Manager</button>
    <button onClick={navtoadminlogin}>Admin</button>
    <Link>SignUp</Link>
    </>
  )
}
