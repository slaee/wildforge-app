import React from 'react';
import Navbar from '../../../Utils/Nav/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
// import Teams from './Teams';
// import EditClass from './EditClass';
// import DeleteClass from './DeleteClass';
import './ViewClass.scss';

function ViewClass() {
    const buttons = [
        { id: 1, label: 'Dashboard', className: 'classes', path: '/dashboard' },
        { id: 2, label: 'Students', className: 'students', path: '/students' },
        { id: 3, label: 'Teams', className: 'teams', path: '/teams' },
        { id: 4, label: 'Edit Class', className: 'profile', path: '/editclass' },
        { id: 5, label: 'Delete Class', className: 'delete', path: '/deleteclass' },
        { id: 6, label: 'Logout', className: 'logout', path: '/logout' },
    ];

  return (
    <>
      <div className="view-class">
        <Navbar buttons={buttons} />
        <div className="content-wrapper">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            {/* <Route path="/teams" element={<Teams />} />
            <Route path="/editclass" element={<EditClass />} />
            <Route path="/deleteclass" element={<DeleteClass />} />
            <Route path="/logout" element={<DeleteClass />} /> */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default ViewClass;
