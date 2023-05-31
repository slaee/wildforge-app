import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../../Utils/Search/Search';
import './EditClass.scss';

function EditClass() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleUpdateButton = () => {
    // Handle update logic
  };

  return (
    <div className='edit-class'>
      <div className='navbar'>
        {/* Add your navigation bar content here */}
      </div>

      <div className='content'>
        <button onClick={handleBackButton}>Back</button>

        <div className='white-box'>
          <h1>Edit Class</h1>
          <div className='input-container'>
            <label htmlFor='className'>Class name:</label>
            <input type='text' id='className' />
          </div>

          <div className='input-container'>
            <label htmlFor='sections'>Sections:</label>
            <input type='text' id='sections' />
          </div>

          <div className='input-container'>
            <label htmlFor='classSchedule'>Class Schedule:</label>
            <input type='text' id='classSchedule' />
          </div>

          <button onClick={handleUpdateButton}>Update</button>
        </div>

        <div className='class-logs'>
          <h2>Class Logs</h2>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default EditClass;
