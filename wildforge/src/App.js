import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreateClass from './Screens/ClassManagement/CreateClass/CreateClass';
import ViewClass from './Screens/ClassManagement/ViewClass/ViewClass';
import ViewDashboard from './Screens/ClassManagement/ViewClass/ClassDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<CreateClass />} />
        <Route path="/class" element={<ViewClass/>}>
          <Route path="dashboard" element={<ViewDashboard/>} />
          <Route path="students" element={<ViewDashboard/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
