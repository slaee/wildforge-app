import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClassDashboard.scss';
import BackButton from '../../../Utils/Button/BackButton';
import ClassLog from '../../../Utils/ClassLog/ClassLog';

function ClassDashboard() {
    const navigate = useNavigate();
  const [studentsInClass, setStudentsInClass] = useState(28);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [identifiedLeaders, setIdentifiedLeaders] = useState(0);
  const [studentsWithNoTeam, setStudentsWithNoTeam] = useState(0);
  const [teams, setTeams] = useState(2);

  const handleBackButton = () => {
    navigate('/admin');
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-center-container'>
        <BackButton handlerOnClick={handleBackButton} />
      
        <div className='status-boxes'>
          <div className='status-box'>
            <div className='status-box-text'>
              <h3>Students in class</h3>
              <p>Pending requests: {pendingRequests}</p>
              <h1>{studentsInClass}/28</h1>
            </div>
          </div>
          <div className='status-box'>
            <div className='status-box-text'>
            <h3>Teams</h3>
            <p>Identified Leaders: {identifiedLeaders}</p>
            <p>Students with no team: {studentsWithNoTeam}</p>
            <h1>{teams}/5</h1>
            </div>
          </div>
        </div>
      </div>

      <ClassLog />

    </div>
    
  );
}

export default ClassDashboard;
