import React from 'react';
import { useNavigate } from 'react-router-dom';

import './BackButton.scss';

const BackButton = ( { handlerOnClick } ) => {
    return (
        <div className='back-button-container' onClick={handlerOnClick}>
            <div className='back-button'>
            </div>
            <h3>Back</h3>
        </div>
        
    )
}

export default BackButton