import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Classes from './screens/class-management/classes/Classes';
import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';
import ForgotPassword from './screens/forgot-password/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </Router>
  );
}

export default App;
