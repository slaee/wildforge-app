import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ViewClass from './screens/class-management/ViewClass';
import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';
import ForgotPassword from './screens/forgot-password/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<ViewClass/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
