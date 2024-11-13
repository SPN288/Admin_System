
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import UserLoginForm from './Screens/User/UserLogin';
import Navbar from './Components/Navbar';


function App() {
  return (
    <>
      <div>
        <Navbar email_id="satya" logout="logout"/>
        <UserLoginForm />
      </div>
    </>
  );
}

export default App;
