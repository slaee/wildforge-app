import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreateClass from './Screens/ClassManagement/CreateClass/CreateClass';
import ViewClass from './Screens/ClassManagement/ViewClass/ViewClass';
import Dashboard from './Screens/ClassManagement/ViewClass/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateClass />} />
        <Route path="/view" element={<ViewClass/>}>
          
        </Route>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
