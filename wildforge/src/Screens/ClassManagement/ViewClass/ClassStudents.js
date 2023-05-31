import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../../Utils/Search/Search';
import './ClassStudents.scss';

function Students() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="students">
      <button onClick={handleBackButton}>Back</button>
      <div className='WhiteBox'>
        <div className="header-table">
          <h1>Students</h1>
            <div className="search-bar">
              <h3>Search</h3>
              <Search placeholder={'Enter student info'} />
            </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Team</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          <div className='JoinRequests-Yellow'>
            <h2>JOIN REQUESTS</h2>
          </div>

          <div className="table-row">
            <div>John</div>
            <div>Doe</div>
            <div>Team A</div>
            <div>Active</div>
            <div>Drop</div>
          </div>

          <div className='Students-Yellow'>
            <div className="table-row">
              <div>John</div>
              <div>Doe</div>
              <div>None</div>
              <div>Pending</div>
              <div>check or X</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
