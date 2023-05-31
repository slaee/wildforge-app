import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../../Utils/Search/Search';
import './EditClass.scss';
import InputBox from '../../../Utils/Input/InputBox';
import FilledButton from '../../../Utils/Button/FilledButton';

function EditClass() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleUpdateButton = () => {
    // Handle update logic
  };

  return (
    <div className='editclass'>
      <div className='back-column-container'>
        <div className='back-container'>
            <button onClick={handleBackButton}>Back</button>
          </div>
        
          <div className='center-container'>
            <div className='white-box'>

              <h1>Edit Class</h1>

              <div className='input-container'>
                <label htmlFor='className'>Class name</label>
                <InputBox placeholder={'Enter class name'} />
              </div>

              <div className='input-container'>
                <label htmlFor='sections'>Sections</label>
                <InputBox placeholder={'Enter sections e.g F1 - F2'}/>
              </div>

              <div className='input-container'>
                <label htmlFor='classSchedule'>Class Schedule</label>
                <InputBox placeholder={'22/22/2022'}/>
              </div>

              <FilledButton label={'Update'} onClick={handleUpdateButton} />
            </div>
          </div>
      </div>
        
      
      <div className='class-log-whitebox'>
        <div className='class-logs-text'>
          <h2>Class Logs</h2>
          <Search />
        </div>
      </div>

    </div>
  );
}

export default EditClass;
