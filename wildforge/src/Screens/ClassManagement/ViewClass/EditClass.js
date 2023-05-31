import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditClass.scss';
import InputBox from '../../../Utils/Input/InputBox';
import FilledButton from '../../../Utils/Button/FilledButton';
import BackButton from '../../../Utils/Button/BackButton';
import ClassLog from '../../../Utils/ClassLog/ClassLog';

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
            <BackButton handlerOnClick={handleBackButton} />
          </div>
        
          <div className='edit-center-container'>
            <div className='edit-white-container'>

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
        
      
      <ClassLog />

    </div>
  );
}

export default EditClass;
