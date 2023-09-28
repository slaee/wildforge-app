import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ViewClass from './screens/class-management/ViewClass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<ViewClass/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
