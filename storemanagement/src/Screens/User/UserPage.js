import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [umail, setamail] = useState();
  useEffect(() => {
    setamail(localStorage.getItem('umail'));
  }, [])
  const handleLogOut = (e) => {
    localStorage.removeItem('umail');
    localStorage.removeItem('utoken');
    navigate("/")
  }
  return (
    <>
    <Navbar email_id={umail} logout={<button className='button-32' onClick={handleLogOut}>Logout</button>} />

    <div className='displaybox'>
      <br /><br /><h1> WELCOME TO USER PAGE</h1></div>
    </>
  )
}
