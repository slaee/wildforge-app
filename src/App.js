import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Classes from './screens/class_management/classes';
import ViewClass from './screens/class_management/view_class';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgot_password';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/view" element={<ViewClass />} />
      </Routes>
    </Router>
  );
}

export default App;
