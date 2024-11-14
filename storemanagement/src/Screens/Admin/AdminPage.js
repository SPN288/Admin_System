import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import '../Page.css'
import ManagerCreateForm from '../Manager/ManagerCreate';
import UCreateForm from '../User/UCreateForm';


export default function AdminPage() {
  const navigate = useNavigate();
  const [amail, setamail] = useState();
  useEffect(() => {
    setamail(localStorage.getItem('amail'));
  }, [])
  const handleLogOut = (e) => {
    localStorage.removeItem('amail');
    localStorage.removeItem('atoken');
    navigate("/")
  }
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  // Fetch users and managers data from the server
  useEffect(() => {
    const headers = {
      headers: {
        'Authorization': localStorage.getItem('atoken')
      }
    }
    fetch('http://localhost:5000/users', headers)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    fetch('http://localhost:5000/mg', headers)
      .then((response) => response.json())
      .then((data) => setManagers(data))
      .catch((error) => console.error('Error fetching managers:', error));
  }, []);

  // Function to delete a user by email_id
  const handleDeleteUser = (emailId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(emailId)
    }
  };
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

  // Function to delete a manager by email_id
  const handleDeleteManager = (emailId) => {
    if (window.confirm('Are you sure you want to delete this Manager?')) {
      deleteManager(emailId)
    }
  };
  
  const deleteManager = async (emailId) => {
    try {
      const response = await fetch(`http://localhost:5000/deletemanager/${emailId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        alert('Manager deleted successfully');
        setManagers(managers.filter((manager) => manager.email_id !== emailId)); // Update the state
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error deleting manager:', error);
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
  const [showManagers, setShowManagers] = useState(false);
  const toggleShowManagers = () => {
    setShowManagers(!showManagers);
  };
  const [showCreateManager, setCreateManager] = useState(false);
  const toggleCreateManager = () => {
    setCreateManager(!showCreateManager);
  };

  return (
    <>

      <Navbar email_id={amail} logout={<button className='button-32' onClick={handleLogOut}>Logout</button>} />
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
          {showUsers ? 'close' : 'Show User Data'}
        </button>

        {showUsers && (
          <div>
            <ul>
              {users.map((user) => (
                <div className='dbox'>
                  <li key={user.email_id}>
                    Name-{user.name} <br /> Email ID - {user.email_id} <br />Department - {user.department} <br /> Employee ID - {user.emp_id} <br /> Mobile Number - {user.mobile_number} <br />
                    <button className="custom-btn btn-2" onClick={() => handleDeleteUser(user.email_id)}>Delete </button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}

        <h1>Managers</h1>
        <button className='button-84' onClick={toggleCreateManager}>
          {showCreateManager ? 'close' : 'Add Manager'}
        </button>
        {showCreateManager && (
          <div>
            <ManagerCreateForm />
          </div>
        )}

        <br />
        <button className='button-84' onClick={toggleShowManagers}>
          {showManagers ? 'Close' : 'Show Manager Data'}
        </button>
        {showManagers && (
          <div>
            <ul>
              {managers.map((manager) => (
                <div className='dbox'>
                  <li key={manager.email_id}>
                    Name - {manager.name} <br />Employee ID - {manager.emp_id} <br /> Email Id - {manager.email_id} <br /> Store ID - {manager.store_id} <br /> Mobile Number - {manager.mobile_number} <br />
                    <button className="custom-btn btn-2" onClick={() => handleDeleteManager(manager.email_id)} >Delete</button>
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
