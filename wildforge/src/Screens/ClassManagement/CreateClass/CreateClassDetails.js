import React, { useState } from 'react';
import FilledButton from '../../../Utils/Button/FilledButton';
import InputBox from '../../../Utils/Input/InputBox';
import './CreateClassDetails.scss';

function CreateClassDetails({ handlerOnClick }) {
  const [clicked, setClicked] = useState(false);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handlerOnCreate = () => {
    setClicked(true);
  }

  return (
    <div className='create-class-details-container' onClick={handlerOnClick}>
      <div className='create-details-container' onClick={handleContainerClick}>
        <p className='create-class-container-title'>Create Class</p>
        <InputBox title='Class Name' placeholder='Enter class name' />
        <InputBox title='Class Section' placeholder='Enter sections. e.g F1 - F2' />
        <InputBox title='Class Schedule' placeholder='DD/MM/YYYY' />
        <FilledButton label='Create' handlerOnClick={handlerOnCreate}/>
        {clicked && 
        <div className='code-container'>
          <div className='code-content'>
              <p className='code-title'>Class Code</p>
              <p className='code'>SAMPL3-C0D3</p>
          </div>
          <FilledButton label='Copy' />
        </div>
      }
      </div>
    </div>
  );
}


export default CreateClassDetails;