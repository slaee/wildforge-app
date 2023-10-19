import { Route, Routes } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import Classes from './screens/class_management/classes';
import ViewClass from './screens/class_management/view_class';
import Login from './screens/login';
import Signup from './screens/signup';
import ForgotPassword from './screens/forgot_password';
import Logout from './screens/logout';
import { NoAuthRoute } from './hocs/NoAuthRoute';
import { PrivateRoute } from './hocs/PrivateRoute';
import ViewClassMembers from './screens/class_management/view_class_members';
import Teams from './screens/team_management/teams';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/logout" element={<Logout />} />

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
        <Route
          path="/classes/:id"
          element={
            <PrivateRoute>
              <ViewClass />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes/:id/members"
          element={
            <PrivateRoute>
              <ViewClassMembers />
            </PrivateRoute>
          }
        />
        <Route
          path="/teams/:id"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
