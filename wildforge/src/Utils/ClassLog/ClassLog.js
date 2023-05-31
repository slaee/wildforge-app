import React from 'react';
import InputBox from '../Input/InputBox';
import './ClassLog.scss';

const ClassLog = () => {
  return (
    <div className='classlogs-whitebox'>
        <div className='classlogs-content'>
          <h2>Class Logs</h2>
          <div className='classlogs-InputBox'>
            <InputBox placeholder={'Search logs'}/>
          </div>
        </div>
    </div>
  );
};
 
export default ClassLog;
