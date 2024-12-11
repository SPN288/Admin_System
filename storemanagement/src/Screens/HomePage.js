import React from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import './homepage.css'
import AdminLoginForm from './Admin/AdminLogin';
import {Link} from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  


  return (
    <>
      <Navbar logout={<p>New User  <Link to='/usercreate'>SignUp</Link></p>} />
      <div className='home'>
        <div className='btnbox'>
          <p>This is a free instance which will spin down with inactivity,
             which can delay requests by 50 seconds or more.So wait a bit.Sorry for inconvenience.Thanks</p>
          <div>Default Admin - admin@admin.com <br /> Password - admin@123 <br /> For user SignUp</div>
          <AdminLoginForm/>
        </div>
      </div>
    </>
  )
}
