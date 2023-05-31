import React, { useState, useEffect } from 'react';
import Navbar from '../../../Utils/Nav/Navbar';
import './ViewClass.scss';
import ClassDashboard from './ClassDashboard';
import ClassStudents from './ClassStudents';
import EditClass from './EditClass';

function ViewClass() {
  const [selectedContent, setSelectedContent] = useState('dashboard');

  const buttons = [
    { id: 1, label: 'Dashboard', className: 'classes', path: 'dashboard' },
    { id: 2, label: 'Students', className: 'students', path: 'students' },
    { id: 3, label: 'Teams', className: 'teams', path: 'teams' },
    { id: 4, label: 'Edit Class', className: 'profile', path: 'edit' },
    { id: 5, label: 'Delete Class', className: 'delete', path: 'delete' },
    { id: 6, label: 'Logout', className: 'logout', path: 'logout' },
  ];

  useEffect(() => {
    // Set the initial selected content to 'dashboard' when the component mounts
    setSelectedContent('dashboard');
  }, []);

  const handleButtonClick = (buttonId) => {
    // Update the selected content based on the button clicked
    const selectedButton = buttons.find((button) => button.id === buttonId);
    if (selectedButton) {
      setSelectedContent(selectedButton.path);
    }
  };

  return (
    <>
      <div className="view-class">
        <Navbar buttons={buttons} onButtonClick={handleButtonClick} />
        <div className="content-wrapper">
          {selectedContent === 'dashboard' && <ClassDashboard />}
          {selectedContent === 'students' && <ClassStudents />}
          {selectedContent === 'edit' && <EditClass />}
        </div>
      </div>
    </>
  );
}

export default ViewClass;