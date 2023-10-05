import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import Classes from './screens/class_management/classes';
import ViewClass from './screens/class_management/view_class';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgot_password';
import { NoAuthRoute } from './hocs/NoAuthRoute';
import { PrivateRoute } from './hocs/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <NoAuthRoute>
                <Login />
              </NoAuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <NoAuthRoute>
                <Signup />
              </NoAuthRoute>
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/classes"
            element={
              <PrivateRoute>
                <Classes />
              </PrivateRoute>
            }
          />
          <Route path="/view" element={<ViewClass />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
