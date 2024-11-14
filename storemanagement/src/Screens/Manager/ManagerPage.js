import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import '../Page.css'
import UCreateForm from '../User/UCreateForm';


export default function ManagerPage() {
  const navigate = useNavigate();
  const [mmail, setamail] = useState();
  useEffect(() => {
    setamail(localStorage.getItem('mmail'));
  }, [])
  const handleLogOut = (e) => {
    localStorage.removeItem('mmail');
    localStorage.removeItem('mtoken');
    navigate("/")
  }
  const [users, setUsers] = useState([]);

  // Fetch users and managers data from the server
  useEffect(() => {
    const headers = {
      headers: {
        'Authorization': localStorage.getItem('mtoken')
      }
    }
    fetch('http://localhost:5000/usersformanager', headers)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Function to delete a user by email_id
  const deleteUser = async (emailId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteuser/${emailId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        alert('User deleted successfully');
        setUsers(users.filter((user) => user.email_id !== emailId)); // Update the state
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const [showUsers, setShowUsers] = useState(false);
  const toggleShowUsers = () => {
    setShowUsers(!showUsers);
  };
  const [showCreateUser, setShowCreateUser] = useState(false);
  const toggleCreateUser = () => {
    setShowCreateUser(!showCreateUser);
  };

  return (
    <>
      <Navbar email_id={mmail} logout={<button className='button-32' onClick={handleLogOut}>Logout</button>} />
      <div className='displaybox'>
        <br />
        <h1>Users</h1>
        <button className='button-84' onClick={toggleCreateUser}>
          {showCreateUser ? 'close' : 'Add User'}
        </button>
        {showCreateUser && (
          <div>
            <UCreateForm />
          </div>
        )}
        <br />
        <button className='button-84' onClick={toggleShowUsers}>
          {showUsers ? 'Hide User Data' : 'Show User Data'}
        </button>

        {showUsers && (
          <div>
            <ul>
              {users.map((user) => (
                <div className='dbox'>
                  <li key={user.email_id}>
                    Name-{user.name} <br /> Email ID - {user.email_id} <br />Department - {user.department} <br /> Employee ID - {user.emp_id} <br /> Mobile Number - {user.mobile_number} <br />
                    <button className="custom-btn btn-2" onClick={() => deleteUser(user.email_id)}>Delete</button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
