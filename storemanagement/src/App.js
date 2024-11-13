
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import HomePage from './Screens/HomePage';
import UserCreateForm from './Screens/User/UserCreate';
import UserLoginForm from './Screens/User/UserLogin';
import ManagerCreateForm from './Screens/Manager/ManagerCreate';
import ManagerLoginForm from './Screens/Manager/ManagerLogin';
import AdminLoginForm from './Screens/Admin/AdminLogin';
import AdminPage from './Screens/Admin/AdminPage';


function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<HomePage/>} />      
      <Route exact path="/adminlogin" element={<AdminLoginForm/>} />
      <Route exact path="/adminpage" element={<AdminPage/>} />
    </Routes>
    </Router>
  );
}

export default App;
