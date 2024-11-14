import React from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import './homepage.css'

export default function HomePage() {
  const navigate = useNavigate();
  const navtoadminlogin = () => { navigate("/adminlogin"); }
  const navtomanagerlogin = () => { navigate("/managerlogin"); }
  const navtouserlogin = () => { navigate("/userlogin"); }


  return (
    <>
      <Navbar />
      <div className='home'>
        <div className='btnbox'>
          <button class="full-rounded" onClick={navtouserlogin}><span>User</span><div class="border full-rounded"></div></button><br /><br />
          <button class="full-rounded" onClick={navtomanagerlogin}><span>Manager</span><div class="border full-rounded"></div></button><br /><br />
          <button class="full-rounded" onClick={navtoadminlogin}><span>Admin</span><div class="border full-rounded"></div></button><br /><br />
        </div>
      </div>
    </>
  )
}
