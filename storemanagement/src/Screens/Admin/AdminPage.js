import React, { useEffect, useState } from 'react'
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";


export default function AdminPage() {
    const navigate = useNavigate();
    const [amail,setamail]=useState();
    useEffect(()=>{
       setamail(localStorage.getItem('amail'));
    },[])
    const handleLogOut=(e)=>{
        localStorage.removeItem('amail');
        localStorage.removeItem('atoken');
        navigate("/")
    }
    const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  // Fetch users and managers data from the server
  useEffect(() => {
    const headers={
        headers:{
            'Authorization':localStorage.getItem('atoken')
        }
    }
    fetch('http://localhost:5000/users',headers)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    fetch('http://localhost:5000/mg',headers)
      .then((response) => response.json())
      .then((data) => setManagers(data))
      .catch((error) => console.error('Error fetching managers:', error));
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

  // Function to delete a manager by email_id
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
  return (
    <>
    <Navbar email_id={amail} logout={<button onClick={handleLogOut}>Logout</button>} />
    <div>
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email_id}>
            {user.name} - {user.email_id}
            <button onClick={() => deleteUser(user.email_id)}>Delete User</button>
          </li>
        ))}
      </ul>

      <h1>Managers</h1>
      <ul>
        {managers.map((manager) => (
          <li key={manager.email_id}>
            {manager.name} - {manager.email_id}
            <button onClick={() => deleteManager(manager.email_id)}>Delete Manager</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  )
}
