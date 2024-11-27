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
          <AdminLoginForm/>
        </div>
      </div>
    </>
  )
}
