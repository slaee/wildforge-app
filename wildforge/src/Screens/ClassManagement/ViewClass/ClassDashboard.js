import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../../Utils/Search/Search';
import './ClassDashboard.scss';

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
      <button onClick={handleBackButton}>Back</button>

      <div className='status-boxes'>
        <div className='status-box'>
          <h3>Students in class</h3>
          <p>Pending requests: {pendingRequests}</p>
          <h1>{studentsInClass}/28</h1>
        </div>
        <div className='status-box'>
          <h3>Teams</h3>
          <p>Identified Leaders: {identifiedLeaders}</p>
          <p>Students with no team: {studentsWithNoTeam}</p>
          <h1>{teams}/5</h1>
        </div>
      </div>

      <div className='class-logs'>
        <h2>Class Logs</h2>
        <Search />
        {/* Here you can add the list of logs */}
      </div>

    </div>
  );
}

export default ClassDashboard;
