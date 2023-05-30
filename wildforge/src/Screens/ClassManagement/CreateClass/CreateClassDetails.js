import React from 'react';
import FilledButton from '../../../Utils/Button/FilledButton';
import InputBox from '../../../Utils/Input/InputBox';
import './CreateClassDetails.scss';

function CreateClassDetails({ handlerOnClick }) {
  return (
    <div className='create-class-details-container' onClick={handlerOnClick}>
      <div className='create-class-container'>
        <p className='create-class-container-title'>Create Class</p>
        <InputBox title='Class Name' placeholder='Enter class name' />
        <InputBox title='Class Section' placeholder='Enter sections. e.g F1 - F2' />
        <InputBox title='Class Schedule' placeholder='DD/MM/YYYY' />
        <FilledButton label='Create' />
      </div>
    </div>
  );
}

export default CreateClassDetails;