import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreateClass from './Screens/ClassManagement/CreateClass/CreateClass';
import ViewClass from './Screens/ClassManagement/ViewClass/ViewClass';
import ViewDashboard from './Screens/ClassManagement/ViewClass/ClassDashboard';
import EditClass from './Screens/ClassManagement/ViewClass/EditClass';
import BackButton from './Utils/Button/BackButton';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<CreateClass />} />
        <Route path="/class" element={<ViewClass/>}>
          <Route path="dashboard" element={<ViewDashboard/>} />
          <Route path="students" element={<ViewDashboard/>} />
          <Route path="edit" element={<EditClass/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
