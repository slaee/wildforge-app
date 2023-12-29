// React Imports
import { Route, Routes } from 'react-router-dom';

// Context Imports
import { AuthProvider } from './contexts/AuthContext';
import { NoAuthRoute } from './hocs/NoAuthRoute';
import { PrivateRoute } from './hocs/PrivateRoute';

// Screen Imports
import Login from './screens/login';
import Logout from './screens/logout';
import ForgotPassword from './screens/forgot_password';
import Signup from './screens/signup';
import Classes from './screens/class_management/classes';
import ViewClass from './screens/class_management/view_class';
import ViewClassMembers from './screens/class_management/view_class_members';
import Teams from './screens/team_management/teams';
import PeerEval from './screens/peer_evaluation/view_peer_eval';

// Style Imports
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthRoute>
              <Login />
            </NoAuthRoute>
          }
        />

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
          path="/classes/:id/teamleaders"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/classes/:id/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/peer-eval"
          element={
            <PrivateRoute>
              <PeerEval />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
