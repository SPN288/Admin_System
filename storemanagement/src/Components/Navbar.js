import React from 'react';
import './nav.css'

export default function Navbar(props) {
  return (
    <>
    <header>
    <nav className='navbar'>
            <div>Store Management</div>
            <ul className='nav-links'>
                    <li>Home</li>
                    <li>{props.email_id}</li>
                    <li>{props.logout}</li>
            </ul>
        </nav>
    </header>
    </>
  )
}
