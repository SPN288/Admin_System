import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom'
export default function Navbar(props) {
  return (
    <>
    <header>
    <nav className='navbar'>
            <div>Store Management</div>
            <ul className='nav-links'>
                    <li><Link to='/'>Home</Link></li>
                    <li>{props.email_id}</li>
                    <li>{props.logout}</li>
            </ul>
        </nav>
    </header>
    </>
  )
}
